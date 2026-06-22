import Parser from 'rss-parser'
import { FEEDS, FeedConfig } from './feeds'
import type { Article } from './types'

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'BackstretchReport/1.0 (backstretchreport.com)',
  },
})

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
