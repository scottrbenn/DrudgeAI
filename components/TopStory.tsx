import type { Article } from '@/lib/types'

export default function TopStory({ article }: { article: Article }) {
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(article.url)}&via=BackstretchRpt`
  return (
    <div className="top-story-wrap">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="top-story-link"
      >
        &#9658;&#9658; {article.title} &#9668;&#9668;
      </a>
      <div style={{ marginTop: '6px' }}>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-x-btn"
        >
          Share on &#120143;
        </a>
      </div>
    </div>
  )
}
