import type { SponsoredLink } from '@/lib/types'

export default function SponsoredLink({ link }: { link: SponsoredLink }) {
  return (
    <div className="article-link sponsored-link">
      <span className="tag-sponsored">Sponsored</span>
      <a href={link.url} target="_blank" rel="sponsored noopener noreferrer">
        {link.headline}
      </a>
      <span className="source-tag">({link.sponsor})</span>
    </div>
  )
}
