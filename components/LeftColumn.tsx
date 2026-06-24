import type { Article, AdSlot } from '@/lib/types'
import ArticleLink from './ArticleLink'
import AdSlotComponent from './AdSlot'

interface Props {
  breaking: Article[]
  recent: Article[]
  youtubeVideos: Article[]
  leftAd?: AdSlot
}

// Featured handicappers & insiders — permanent links at column bottom (like Drudge's "Columnists")
const HANDICAPPERS = [
  { label: 'Indian Charlie — Horse of the Day',   href: 'https://www.indiancharlie.com' },
  { label: 'Paulick Report',                       href: 'https://www.paulickreport.com' },
  { label: 'BloodHorse',                           href: 'https://www.bloodhorse.com/horse-racing' },
  { label: 'Thoroughbred Daily News',              href: 'https://www.thoroughbreddailynews.com' },
  { label: 'Past the Wire',                        href: 'https://pastthewire.com' },
  { label: 'Americas Best Racing',                 href: 'https://www.americasbestracing.net' },
  { label: 'Horse Racing Nation',                  href: 'https://www.horseracingnation.com' },
  { label: 'Canadian Thoroughbred',                href: 'https://canadianthoroughbred.com' },
  { label: 'This Is Horse Racing',                 href: 'https://thisishorseracing.com' },
  { label: 'Horse Race Insider',                   href: 'https://www.horseraceinsider.com' },
  { label: 'American Racehorse',                   href: 'https://www.americanracehorse.com' },
]

const RESULTS_TOOLS = [
  { label: 'Equibase — Entries & Results', href: 'https://www.equibase.com/static/entry/index.cfm' },
  { label: 'DRF — Past Performances', href: 'https://www.drf.com' },
  { label: 'Racing Post — Form & Odds', href: 'https://www.racingpost.com' },
  { label: 'Brisnet — Handicapping Data', href: 'https://www.brisnet.com' },
  { label: 'NYRA — New York Racing', href: 'https://www.nyra.com' },
  { label: 'Keeneland — Racing & Sales', href: 'https://www.keeneland.com' },
]

export default function LeftColumn({ breaking, recent, youtubeVideos, leftAd }: Props) {
  return (
    <aside className="col" id="breaking">

      <div className="section-header">Breaking News</div>
      {breaking.length > 0 ? (
        breaking.map((a) => (
          <ArticleLink key={a.id} article={a} showSource showAge />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>Fetching latest stories…</p>
      )}

      <hr className="divider" />

      <div className="section-header">From the Barn</div>
      {recent.slice(0, 12).map((a) => (
        <ArticleLink key={a.id} article={a} showSource />
      ))}

      <hr className="divider" />

      <div className="section-header">&#9654; YouTube</div>
      {youtubeVideos.length > 0 ? (
        youtubeVideos.map((v) => (
          <ArticleLink key={v.id} article={v} showSource showAge />
        ))
      ) : (
        <p style={{ color: '#666', fontSize: '11px' }}>No recent videos.</p>
      )}

      <hr className="divider" />

      {leftAd && (
        <>
          <AdSlotComponent ad={leftAd} />
          <hr className="divider" />
        </>
      )}

      {/* Permanent featured sites — Drudge "Columnists" equivalent */}
      <div className="section-header">Handicappers &amp; Insiders</div>
      {HANDICAPPERS.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}

      <hr className="divider" />

      <div className="section-header">Results &amp; Form</div>
      {RESULTS_TOOLS.map((link) => (
        <div className="article-link" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </div>
      ))}

    </aside>
  )
}
