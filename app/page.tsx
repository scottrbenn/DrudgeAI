import { fetchAllArticles, fetchYouTubeVideos } from '@/lib/rss'
import { fetchTrendingRacingTweets } from '@/lib/twitter'
import { AD_SLOTS, SPONSORED_LINKS, FEEDS } from '@/lib/feeds'
import Header from '@/components/Header'
import NewsletterBanner from '@/components/NewsletterBanner'
import TopStory from '@/components/TopStory'
import LeftColumn from '@/components/LeftColumn'
import CenterColumn from '@/components/CenterColumn'
import RightColumn from '@/components/RightColumn'
import type { Article } from '@/lib/types'

// Cache this page for 30 minutes — Next.js will auto-refresh in the background
export const revalidate = 1800

// Only articles from these professional sources appear in Tips & Picks
const TIPS_SOURCES = new Set(FEEDS.filter((f) => f.tipsEligible).map((f) => f.name))

function categorize(articles: Article[]) {
  // Specific betting/handicapping intent — exclude broad terms like "analysis" and "preview"
  // that amateur sites overuse, and "handicap" which is also a race type
  const tipKeywords = /\b(picks?|best bet[s]?|best play[s]?|top pick[s]?|top horse[s]?|prediction[s]?|worth backing|selections?|morning line|value play|longshot[s]?|handicapping|wagering guide|betting guide|race card)\b/i
  const breedKeywords = /\b(breed|foal|stallion|mare|stud|auction|sale|yearling|wean|keeneland sale|fasig)\b/i

  const breaking:  Article[] = []
  const tips:      Article[] = []
  const breeding:  Article[] = []
  const general:   Article[] = []

  for (const a of articles) {
    if (a.isBreaking) { breaking.push(a); continue }
    // Tips only from credentialed professional sources
    if (tipKeywords.test(a.title) && TIPS_SOURCES.has(a.source)) { tips.push(a); continue }
    if (breedKeywords.test(a.title)) { breeding.push(a); continue }
    general.push(a)
  }

  return { breaking, tips, breeding, general }
}

export default async function Home() {
  const [all, youtubeVideos, tweets] = await Promise.all([
    fetchAllArticles(),
    fetchYouTubeVideos(),
    fetchTrendingRacingTweets(),
  ])
  const { breaking, tips, breeding, general } = categorize(all)

  // Single story shown above the masthead — Drudge's signature element
  const topStory    = breaking[0] ?? all[0] ?? null
  const featured    = (breaking[1] ?? all.find((a) => a.id !== topStory?.id)) ?? null
  const subFeatured = all.filter((a) => a.id !== topStory?.id && a.id !== featured?.id)[0] ?? null

  // Remove the three headline stories from the link pool so they don't repeat
  const headlineIds = new Set([topStory?.id, featured?.id, subFeatured?.id])
  const pool = all.filter((a) => !headlineIds.has(a.id))

  // Left column: breaking stories not already used as headlines, then fill with very recent news
  const leftBreaking = [
    ...breaking.filter((a) => !headlineIds.has(a.id)),
    ...all.filter((a) => !headlineIds.has(a.id) && a.isNew && !breaking.find((b) => b.id === a.id)),
  ].slice(0, 5)

  // Left "from the barn": recent general stories
  const leftRecent = pool.filter((a) => !breaking.includes(a)).slice(0, 8)

  // Center: single merged story list, ~18 articles
  const mainStories = pool.slice(0, 18)

  return (
    <>
      <NewsletterBanner />
      {topStory && <TopStory article={topStory} />}
      <Header />

      <div className="columns-wrap">
        <LeftColumn breaking={leftBreaking} recent={leftRecent} youtubeVideos={youtubeVideos} leftAd={AD_SLOTS.leftBottom} />
        <CenterColumn
          featured={featured}
          subFeatured={subFeatured}
          stories={mainStories}
          tweets={tweets}
          centerAd={AD_SLOTS.centerTop}
          sponsoredLinks={SPONSORED_LINKS}
        />
        <RightColumn tips={tips.slice(0, 10)} breeding={breeding.slice(0, 5)} ad={AD_SLOTS.rightTop} adMid={AD_SLOTS.rightMid} />
      </div>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Backstretch Report · backstretchreport.com ·{' '}
          <a href="mailto:thebackstretchreport@gmail.com">thebackstretchreport@gmail.com</a>
        </p>
        <p style={{ marginTop: '4px' }}>
          All linked content belongs to its original publisher. Backstretch Report aggregates
          publicly available headlines only.
        </p>
      </footer>
    </>
  )
}
