import type { Article, Tweet, AdSlot, SponsoredLink } from '@/lib/types'
import ArticleLink from './ArticleLink'
import TweetLink from './TweetLink'
import AdSlotComponent from './AdSlot'
import SponsoredLinkComponent from './SponsoredLink'
import ThumbLink from './ThumbLink'
import { formatAge } from '@/lib/rss'

interface Props {
  featured: Article | null
  subFeatured: Article | null
  stories: Article[]
  tweets: Tweet[]
  centerAd?: AdSlot
  sponsoredLinks?: SponsoredLink[]
}

export default function CenterColumn({ featured, subFeatured, stories, tweets, centerAd, sponsoredLinks = [] }: Props) {
  return (
    <main className="col col-center">

      {/* Main featured story — second biggest headline after the above-masthead story */}
      {featured && (
        <article>
          {featured.imageUrl && (
            <ThumbLink
              href={featured.url}
              src={featured.imageUrl}
              imgClassName="featured-image"
              featured
            />
          )}
          <h2 className="featured-headline">
            {featured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {featured.title}
            </a>
          </h2>
          <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>{featured.source}</span>
            <span>&nbsp;·&nbsp;</span>
            <time dateTime={featured.pubDate.toISOString()}>{formatAge(featured.pubDate)}</time>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(featured.title)}&url=${encodeURIComponent(featured.url)}&via=BackstretchRpt`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-x-btn"
            >
              Share on &#120143;
            </a>
          </div>
          <hr className="divider" />
        </article>
      )}

      {/* Sub-featured story */}
      {subFeatured && (
        <article>
          {subFeatured.imageUrl && (
            <ThumbLink
              href={subFeatured.url}
              src={subFeatured.imageUrl}
              imgClassName="featured-image featured-image-sub"
            />
          )}
          <h2 className="sub-headline">
            {subFeatured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={subFeatured.url} target="_blank" rel="noopener noreferrer">
              {subFeatured.title}
            </a>
          </h2>
          <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            <span>{subFeatured.source}</span> &nbsp;·&nbsp; <time dateTime={subFeatured.pubDate.toISOString()}>{formatAge(subFeatured.pubDate)}</time>
          </div>
          <hr className="divider" />
        </article>
      )}

      {/* Display ad — above top stories */}
      {centerAd && (
        <>
          <AdSlotComponent ad={centerAd} />
          <hr className="divider" />
        </>
      )}

      {/* Main story list — sponsored links injected every 5th article */}
      <h3 className="section-header">Latest News</h3>
      {stories.flatMap((a, i) => {
        const items = [<ArticleLink key={a.id} article={a} showSource showImage showAge />]
        const sp = sponsoredLinks[(i - 4) / 5 | 0]
        if ((i + 1) % 5 === 0 && sp) items.push(<SponsoredLinkComponent key={`sp-${i}`} link={sp} />)
        return items
      })}

      {tweets.length > 0 && (
        <>
          <hr className="divider" />
          <h3 className="section-header">&#120143; Trending on X</h3>
          {tweets.map((t) => (
            <TweetLink key={t.id} tweet={t} />
          ))}
        </>
      )}

      <a href="#" className="back-to-top">&#9650; Back to Top</a>
    </main>
  )
}
