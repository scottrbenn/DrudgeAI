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
        <>
          {featured.imageUrl && (
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.imageUrl} alt={featured.title} className="featured-image" />
            </a>
          )}
          <div className="featured-headline">
            {featured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {featured.title}
            </a>
          </div>
          <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            {featured.source} &nbsp;·&nbsp; {formatAge(featured.pubDate)}
          </div>
          <hr className="divider" />
        </>
      )}

      {/* Sub-featured story */}
      {subFeatured && (
        <>
          {subFeatured.imageUrl && (
            <a href={subFeatured.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={subFeatured.imageUrl} alt={subFeatured.title} className="featured-image featured-image-sub" />
            </a>
          )}
          <div className="sub-headline">
            {subFeatured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={subFeatured.url} target="_blank" rel="noopener noreferrer">
              {subFeatured.title}
            </a>
          </div>
          <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            {subFeatured.source} &nbsp;·&nbsp; {formatAge(subFeatured.pubDate)}
          </div>
          <hr className="divider" />
        </>
      )}

      {/* Top stories — dense single-column list, Drudge style */}
      <div className="section-header">Top Stories</div>
      {topStories.map((a) => (
        <ArticleLink key={a.id} article={a} showSource />
      ))}

      <hr className="divider" />

      <div className="section-header">In the News</div>
      {moreStories.map((a) => (
        <ArticleLink key={a.id} article={a} showSource showAge />
      ))}

    </main>
  )
}
