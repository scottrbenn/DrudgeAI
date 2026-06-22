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

      {/* Main featured story — biggest headline on the page */}
      {featured && (
        <>
          <div className="featured-headline">
            {featured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={featured.url} target="_blank" rel="noopener noreferrer">
              {featured.title}
            </a>
          </div>
          <div style={{ marginBottom: '6px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            {featured.source} · {formatAge(featured.pubDate)}
          </div>
          <hr className="divider" />
        </>
      )}

      {/* Sub-featured story */}
      {subFeatured && (
        <>
          <div className="sub-headline">
            {subFeatured.isBreaking && <span className="tag-breaking">Breaking</span>}
            <a href={subFeatured.url} target="_blank" rel="noopener noreferrer">
              {subFeatured.title}
            </a>
          </div>
          <div style={{ marginBottom: '6px', fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
            {subFeatured.source} · {formatAge(subFeatured.pubDate)}
          </div>
          <hr className="divider" />
        </>
      )}

      {/* Top stories — three columns of links */}
      <div className="section-header">Top Stories</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0 12px',
        }}
      >
        {topStories.map((a) => (
          <ArticleLink key={a.id} article={a} showSource={false} />
        ))}
      </div>

      <hr className="divider" />

      {/* In the News */}
      <div className="section-header">In the News</div>
      {moreStories.map((a) => (
        <ArticleLink key={a.id} article={a} showSource showAge />
      ))}
    </main>
  )
}
