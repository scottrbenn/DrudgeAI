import { fetchAllArticles, fetchYouTubeVideos } from '@/lib/rss'
import { AD_SLOT } from '@/lib/feeds'
import Header from '@/components/Header'
import TopStory from '@/components/TopStory'
import LeftColumn from '@/components/LeftColumn'
import CenterColumn from '@/components/CenterColumn'
import RightColumn from '@/components/RightColumn'
import type { Article } from '@/lib/types'

// Cache this page for 30 minutes — Next.js will auto-refresh in the background
export const revalidate = 1800

// Simple keyword matching to route articles into columns
function categorize(articles: Article[]) {
  const tipKeywords   = /\b(pick|tip|best bet|handicap|preview|analysis|prediction|top horse|worth backing)\b/i
  const breedKeywords = /\b(breed|foal|stallion|mare|stud|auction|sale|yearling|wean|keeneland sale|fasig)\b/i

  const breaking:  Article[] = []
  const tips:      Article[] = []
  const breeding:  Article[] = []
  const general:   Article[] = []

  for (const a of articles) {
    if (a.isBreaking)              { breaking.push(a);  continue }
    if (tipKeywords.test(a.title)) { tips.push(a);      continue }
    if (breedKeywords.test(a.title)) { breeding.push(a); continue }
    general.push(a)
  }

  return { breaking, tips, breeding, general }
}

export default async function Home() {
  const [all, youtubeVideos] = await Promise.all([fetchAllArticles(), fetchYouTubeVideos()])
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
  ].slice(0, 8)

  // Left "from the barn": recent general stories
  const leftRecent = pool.filter((a) => !breaking.includes(a)).slice(0, 12)

  // Center top stories and more stories
  const topStories  = pool.slice(0, 15)
  const moreStories = pool.slice(15, 27)

  return (
    <>
      {topStory && <TopStory article={topStory} />}
      <Header />

      <div className="columns-wrap">
        <LeftColumn breaking={leftBreaking} recent={leftRecent} youtubeVideos={youtubeVideos} />
        <CenterColumn
          featured={featured}
          subFeatured={subFeatured}
          topStories={topStories}
          moreStories={moreStories}
        />
        <RightColumn tips={tips.slice(0, 8)} breeding={breeding.slice(0, 8)} ad={AD_SLOT} />
      </div>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Backstretch Report · backstretchreport.com ·{' '}
          <a href="mailto:tips@backstretchreport.com">tips@backstretchreport.com</a>
        </p>
        <p style={{ marginTop: '4px' }}>
          All linked content belongs to its original publisher. Backstretch Report aggregates
          publicly available headlines only.
        </p>
      </footer>
    </>
  )
}
