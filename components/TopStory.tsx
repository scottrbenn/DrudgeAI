import type { Article } from '@/lib/types'

export default function TopStory({ article }: { article: Article }) {
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
    </div>
  )
}
