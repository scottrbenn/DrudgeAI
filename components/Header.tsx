import { formatEasternTime } from '@/lib/rss'
import { tracksForDate } from '@/lib/schedule'

const NAV_LINKS = [
  { label: '🏇 Derby Trail', href: '#breaking' },
  { label: 'Results', href: '#results' },
  { label: 'Tips & Picks', href: '#tips' },
  { label: 'Breeding', href: '#breeding' },
  { label: 'Racing TV', href: 'https://www.racingtv.com', target: '_blank' },
  { label: 'Race Entries', href: 'https://www.equibase.com/static/entry/index.cfm', target: '_blank' },
  { label: '✉ Newsletter', href: '#newsletter' },
]

function fmtDay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).toUpperCase()
}

function buildSection(label: string, date: Date): string {
  const tracks = tracksForDate(date)
  if (tracks.length === 0) return `▸ ${label} — NO MAJOR RACES SCHEDULED`
  const items = tracks.map((t) => `${t.name.toUpperCase()} ${t.postTime.toUpperCase()}`).join('   ·   ')
  return `▸ ${label} — ${items}`
}

export default function Header() {
  const now      = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const dateStr  = formatEasternTime(now)

  const todaySection    = buildSection(fmtDay(now), now)
  const tomorrowSection = buildSection(fmtDay(tomorrow), tomorrow)
  const tickerText      = `${todaySection}                    ${tomorrowSection}`

  const todayCount    = tracksForDate(now).length
  const tomorrowCount = tracksForDate(tomorrow).length
  const showTicker    = todayCount > 0 || tomorrowCount > 0

  return (
    <header>
      {/* Ticker — only shown when at least one day has races scheduled */}
      {showTicker && (
        <div className="ticker-wrap">
          <span className="ticker-label">RACE SCHEDULE</span>
          <span className="ticker-inner">
            {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      )}

      {/* Logo + date */}
      <div className="site-header">
        <h1 className="site-logo-wrap">
          <a href="/" aria-label="Backstretch Report — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="The Backstretch Report"
              className="site-logo"
            />
          </a>
        </h1>
        <div className="site-date">{dateStr} ET &nbsp;·&nbsp; Updated every 30 minutes</div>

        {/* Nav */}
        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
