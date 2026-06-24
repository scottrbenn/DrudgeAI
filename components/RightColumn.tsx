import type { Article, AdSlot } from '@/lib/types'
import ArticleLink from './ArticleLink'
import AdSlotComponent from './AdSlot'

interface Props {
  tips: Article[]
  breeding: Article[]
  ad: AdSlot
  adMid?: AdSlot
}

const EXPERT_HANDICAPPERS = [
  { label: 'Racing Dudes — Daily Best Bets',           href: 'https://www.racingdudes.com/best-bets/' },
  { label: 'Horse Racing Nation — Best Bets',          href: 'https://www.horseracingnation.com/best-bets' },
  { label: 'Past the Wire — Handicapping',             href: 'https://pastthewire.com' },
  { label: 'Brisnet — Free Picks',                     href: 'https://www.brisnet.com/cgi-bin/free.cgi' },
  { label: 'DRF — Handicapping Central',               href: 'https://www.drf.com/handicapping' },
  { label: 'Pace Advantage — Handicapping Forum',      href: 'https://www.paceadvantage.com' },
  { label: 'TrackMaster — Speed Figures',              href: 'https://www.trackmaster.com' },
]

const MAJOR_RACES = [
  { label: 'NTRA — National Thoroughbred Racing Assoc.', href: 'https://www.ntra.com' },
  { label: 'Kentucky Derby — Churchill Downs', href: 'https://www.kentuckyderby.com' },
  { label: 'Preakness Stakes — Pimlico', href: 'https://www.preakness.com' },
  { label: "Belmont Stakes — Saratoga", href: 'https://www.belmontstakes.com' },
  { label: "Breeders' Cup", href: 'https://www.breederscup.com' },
  { label: 'Royal Ascot', href: 'https://www.ascot.com' },
  { label: 'Cheltenham Festival', href: 'https://www.cheltenham.co.uk' },
  { label: 'Melbourne Cup', href: 'https://www.flemington.com.au/melbourne-cup-carnival' },
]

const WAGERING = [
  { label: 'TVG / FanDuel Racing', href: 'https://www.tvg.com' },
  { label: 'TwinSpires', href: 'https://www.twinspires.com' },
  { label: 'DraftKings Racing', href: 'https://www.draftkings.com/racing' },
  { label: 'BetMGM Horse Racing', href: 'https://sports.betmgm.com/en/horse-racing' },
  { label: '1/ST BET', href: 'https://www.1stbet.com' },
  { label: 'NYRA Bets', href: 'https://www.nyrabets.com' },
]

const WATCH = [
  { label: 'Racing TV — Live Streams', href: 'https://www.racingtv.com' },
  { label: 'FS2 / Fox Sports Racing', href: 'https://www.foxsports.com' },
  { label: 'HRTV', href: 'https://www.hrtv.com' },
  { label: 'NBC Sports — Racing', href: 'https://www.nbcsports.com' },
]

export default function RightColumn({ tips, breeding, ad, adMid }: Props) {
  return (
    <aside className="col">

      {/* Sponsored ad slot */}
      <AdSlotComponent ad={ad} />

      <hr className="divider" />

      <div className="section-header" id="tips">Tips &amp; Picks</div>
      {tips.length > 0 ? (
        tips.map((a) => (
          <ArticleLink key={a.id} article={a} showSource showAge />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>No picks posted yet today — check back soon.</p>
      )}

      <hr className="divider" />

      <div className="section-header">Expert Handicappers</div>
      {EXPERT_HANDICAPPERS.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}

      <hr className="divider" />

      {adMid && (
        <>
          <AdSlotComponent ad={adMid} />
          <hr className="divider" />
        </>
      )}

      <div className="section-header" id="breeding">Breeding &amp; Sales</div>
      {breeding.length > 0 ? (
        breeding.map((a) => (
          <ArticleLink key={a.id} article={a} showSource />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>Check back soon.</p>
      )}

      <hr className="divider" />

      {/* Permanent featured links — Drudge "Wire Services" equivalent */}
      <div className="section-header">Major Races</div>
      {MAJOR_RACES.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}

      <hr className="divider" />

      <div className="section-header">Wagering</div>
      {WAGERING.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}

      <hr className="divider" />

      <div className="section-header">Watch Live</div>
      {WATCH.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}


      <a href="#" className="back-to-top">&#9650; Back to Top</a>
    </aside>
  )
}
