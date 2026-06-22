import type { Article } from '@/lib/types'
import { formatAge } from '@/lib/rss'

interface Props {
  article: Article
  showSource?: boolean
  showAge?: boolean
}

export default function ArticleLink({ article, showSource = true, showAge = false }: Props) {
  return (
    <div className="article-link">
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
