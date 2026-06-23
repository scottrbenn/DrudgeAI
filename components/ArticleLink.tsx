import type { Article } from '@/lib/types'
import { formatAge } from '@/lib/rss'
import ThumbLink from './ThumbLink'

interface Props {
  article: Article
  showSource?: boolean
  showAge?: boolean
  showImage?: boolean
}

export default function ArticleLink({ article, showSource = true, showAge = false, showImage = false }: Props) {
  const isHot = article.isBreaking || article.isNew

  if (showImage && article.imageUrl) {
    return (
      <div className={`article-link article-link-with-thumb${isHot ? ' article-link-hot' : ''}`}>
        <ThumbLink
          href={article.url}
          src={article.imageUrl}
          imgClassName="article-thumb"
          wrapClassName="article-thumb-wrap"
        />
        <div className="article-thumb-body">
          {article.isBreaking && <span className="tag-breaking">Breaking</span>}
          {!article.isBreaking && article.isNew && <span className="tag-new">New</span>}
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
          {showSource && <span className="source-tag">({article.source})</span>}
          {showAge && <span className="source-tag">{formatAge(article.pubDate)}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={`article-link${isHot ? ' article-link-hot' : ''}`}>
      {article.isBreaking && <span className="tag-breaking">Breaking</span>}
      {!article.isBreaking && article.isNew && <span className="tag-new">New</span>}
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        {article.title}
      </a>
      {showSource && <span className="source-tag">({article.source})</span>}
      {showAge && <span className="source-tag">{formatAge(article.pubDate)}</span>}
    </div>
  )
}
