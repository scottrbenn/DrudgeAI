import type { Article } from '@/lib/types'
import type { AdSlot } from '@/lib/types'
import ArticleLink from './ArticleLink'
import AdSlotComponent from './AdSlot'
import NewsletterSignup from './NewsletterSignup'

interface Props {
  tips: Article[]
  breeding: Article[]
  ad: AdSlot
}

const TRIPLE_CROWN = [
  { label: 'Kentucky Derby — Churchill Downs', href: 'https://www.kentuckyderby.com' },
  { label: 'Preakness Stakes — Pimlico', href: 'https://www.preakness.com' },
  { label: 'Belmont Stakes — Saratoga', href: 'https://www.belmontstakes.com' },
  { label: "Breeders' Cup", href: 'https://www.breederscup.com' },
  { label: 'Royal Ascot', href: 'https://www.ascot.com' },
  { label: 'Cheltenham Festival', href: 'https://www.cheltenham.co.uk' },
]

export default function RightColumn({ tips, breeding, ad }: Props) {
  return (
    <aside className="col">

      {/* Newsletter sign-up — prime real estate */}
      <NewsletterSignup />

      {/* Sponsored ad slot */}
      <AdSlotComponent ad={ad} />

      <hr className="divider" />

      {/* Tips & Picks */}
      <div className="section-header" id="tips">Tips &amp; Picks</div>
      {tips.length > 0 ? (
        tips.map((a) => (
          <ArticleLink key={a.id} article={a} showSource />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>No tip stories yet today.</p>
      )}

      <hr className="divider" />

      {/* Breeding news */}
      <div className="section-header" id="breeding">Breeding &amp; Sales</div>
      {breeding.length > 0 ? (
        breeding.map((a) => (
          <ArticleLink key={a.id} article={a} showSource />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>Check back soon.</p>
      )}

      <hr className="divider" />

      {/* Major races quick links */}
      <div className="section-header">Major Races</div>
      {TRIPLE_CROWN.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}
    </aside>
  )
}
