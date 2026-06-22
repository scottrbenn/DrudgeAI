import type { Article } from '@/lib/types'
import ArticleLink from './ArticleLink'

interface Props {
  breaking: Article[]
  recent: Article[]
}

const TRACK_LINKS = [
  { label: 'Equibase — Entries & Results', href: 'https://www.equibase.com/static/entry/index.cfm' },
  { label: 'DRF — Past Performances', href: 'https://www.drf.com' },
  { label: 'Racing Post — Form & Odds', href: 'https://www.racingpost.com' },
  { label: 'TVG — Watch & Bet Live', href: 'https://www.tvg.com' },
  { label: 'TwinSpires — Wagering', href: 'https://www.twinspires.com' },
  { label: 'Brisnet — Handicapping', href: 'https://www.brisnet.com' },
]

export default function LeftColumn({ breaking, recent }: Props) {
  return (
    <aside className="col" id="breaking">
      {/* Breaking news */}
      <div className="section-header">🔴 Breaking News</div>
      {breaking.length > 0 ? (
        breaking.map((a) => (
          <ArticleLink key={a.id} article={a} showSource showAge />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>Fetching latest stories…</p>
      )}

      <hr className="divider" />

      {/* From the barn (recent secondary stories) */}
      <div className="section-header">From the Barn</div>
      {recent.slice(0, 10).map((a) => (
        <ArticleLink key={a.id} article={a} showSource />
      ))}

      <hr className="divider" />

      {/* Quick links to essential tools */}
      <div className="section-header">Essential Links</div>
      {TRACK_LINKS.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}
    </aside>
  )
}
