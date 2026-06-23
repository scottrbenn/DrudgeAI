import type { Article } from '@/lib/types'
import ArticleLink from './ArticleLink'
import { formatAge } from '@/lib/rss'

interface Props {
  featured: Article | null
  subFeatured: Article | null
  topStories: Article[]
  moreStories: Article[]
}

export default function CenterColumn({ featured, subFeatured, topStories, moreStories }: Props) {
  return (
    <main className="col col-center">

      {/* Main featured story — second biggest headline after the above-masthead story */}
      {featured && (
        <article>
          {featured.imageUrl && (
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.imageUrl} alt={featured.title} className="featured-image" />
            </a>
          )}
          <h2 className="featured-headline">
            {featured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {featured.title}
            </a>
          </h2>
          <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            <span>{featured.source}</span> &nbsp;·&nbsp; <time dateTime={featured.pubDate.toISOString()}>{formatAge(featured.pubDate)}</time>
          </div>
          <hr className="divider" />
        </article>
      )}

      {/* Sub-featured story */}
      {subFeatured && (
        <article>
          {subFeatured.imageUrl && (
            <a href={subFeatured.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={subFeatured.imageUrl} alt={subFeatured.title} className="featured-image featured-image-sub" />
            </a>
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

      {/* Top stories — dense single-column list, Drudge style */}
      <h3 className="section-header">Top Stories</h3>
      {topStories.map((a) => (
        <ArticleLink key={a.id} article={a} showSource />
      ))}

      <hr className="divider" />

      <h3 className="section-header">In the News</h3>
      {moreStories.map((a) => (
        <ArticleLink key={a.id} article={a} showSource showAge />
      ))}

    </main>
  )
}
