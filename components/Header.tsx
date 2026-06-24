import { formatEasternTime } from '@/lib/rss'

const NAV_LINKS = [
  { label: '🏇 Derby Trail', href: '#breaking' },
  { label: 'Results', href: '#results' },
  { label: 'Tips & Picks', href: '#tips' },
  { label: 'Breeding', href: '#breeding' },
  { label: 'Racing TV', href: 'https://www.racingtv.com', target: '_blank' },
  { label: 'Race Entries', href: 'https://www.equibase.com/static/entry/index.cfm', target: '_blank' },
  { label: '✉ Newsletter', href: '#newsletter' },
]

const TICKER_ITEMS = [
  'BELMONT PARK — GATES OPEN 11AM ET',
  'CHURCHILL DOWNS — FIRST POST 12:45PM ET',
  'SANTA ANITA — FIRST POST 1PM PT',
  'SARATOGA — FIRST POST 1PM ET',
  'KEENELAND — FIRST POST 1:05PM ET',
  'DEL MAR — FIRST POST 2PM PT',
]

export default function Header() {
  const now = new Date()
  const dateStr = formatEasternTime(now)
  const tickerDate = now.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).toUpperCase()

  return (
    <header>
      {/* Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-label">{tickerDate} · TODAY&apos;S TRACKS</span>
        <span className="ticker-inner">
          {TICKER_ITEMS.join('   ·   ')}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {TICKER_ITEMS.join('   ·   ')}
        </span>
      </div>

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
