import Parser from 'rss-parser'
import { FEEDS, FeedConfig, YOUTUBE_CHANNELS, YoutubeChannel } from './feeds'
import type { Article } from './types'

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'BackstretchReport/1.0 (backstretchreport.com)',
  },
  customFields: {
    item: [
      ['media:content',   'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
})

// Force http → https so images load on mobile (iOS blocks mixed content)
function ensureHttps(url: string): string {
  return url.replace(/^http:/i, 'https:')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImage(item: any): string | undefined {
  // media:content — most common in horse racing RSS feeds
  const mc = item.mediaContent
  if (mc) {
    if (Array.isArray(mc) && mc[0]?.$?.url) return ensureHttps(mc[0].$.url)
    if (mc?.$?.url) return ensureHttps(mc.$.url)
  }
  // media:thumbnail
  const mt = item.mediaThumbnail
  if (mt) {
    if (Array.isArray(mt) && mt[0]?.$?.url) return ensureHttps(mt[0].$.url)
    if (mt?.$?.url) return ensureHttps(mt.$.url)
  }
  // enclosure (image attachment)
  if (item.enclosure?.url && item.enclosure?.type?.startsWith('image/')) {
    return ensureHttps(item.enclosure.url)
  }
  // first <img> tag inside content:encoded or content
  const html: string = item['content:encoded'] ?? item.content ?? ''
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(html)
  if (match?.[1]) return ensureHttps(match[1])
  return undefined
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim()
}

async function fetchFeed(feed: FeedConfig): Promise<Article[]> {
  try {
    const result = await parser.parseURL(feed.url)
    const now = new Date()

    return (result.items ?? []).slice(0, 20).map((item) => {
      const pubDate = item.pubDate ? new Date(item.pubDate) : now
      const ageHours = (now.getTime() - pubDate.getTime()) / 3_600_000

      return {
        id: item.guid ?? item.link ?? String(Math.random()),
        title: cleanTitle(item.title ?? 'Untitled'),
        url: item.link ?? '#',
        source: feed.name,
        pubDate,
        isNew: ageHours < 3,
        isBreaking: feed.priority === 1 && ageHours < 8,
        imageUrl: extractImage(item),
      }
    })
  } catch {
    // Silently skip feeds that are down — others still show
    return []
  }
}

export async function fetchAllArticles(): Promise<Article[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed))

  const all: Article[] = []
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value)
  }

  // Deduplicate by URL
  const seen = new Set<string>()
  const unique = all.filter((a) => {
    if (seen.has(a.url)) return false
    seen.add(a.url)
    return true
  })

  // Newest first
  return unique.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
}

async function fetchYouTubeFeed(channel: YoutubeChannel): Promise<Article[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId}`
  try {
    const result = await parser.parseURL(feedUrl)
    const now = new Date()

    return (result.items ?? []).slice(0, 5).map((item) => {
      const rawDate = item.isoDate ?? item.pubDate
      const pubDate = rawDate ? new Date(rawDate) : now
      const ageHours = (now.getTime() - pubDate.getTime()) / 3_600_000

      return {
        id: item.guid ?? item.link ?? String(Math.random()),
        title: cleanTitle(item.title ?? 'Untitled'),
        url: item.link ?? `https://www.youtube.com/channel/${channel.channelId}`,
        source: channel.name,
        pubDate,
        isNew: ageHours < 48,
        isBreaking: false,
      }
    })
  } catch {
    return []
  }
}

export async function fetchYouTubeVideos(): Promise<Article[]> {
  const results = await Promise.allSettled(YOUTUBE_CHANNELS.map(fetchYouTubeFeed))

  const all: Article[] = []
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value)
  }

  const seen = new Set<string>()
  const unique = all.filter((a) => {
    if (seen.has(a.url)) return false
    seen.add(a.url)
    return true
  })

  return unique.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()).slice(0, 12)
}

export function formatAge(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function formatEasternTime(date: Date): string {
  return date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
