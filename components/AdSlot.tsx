import type { AdSlot } from '@/lib/types'

export default function AdSlot({ ad }: { ad: AdSlot }) {
  return (
    <div className="ad-slot">
      <div className="ad-slot-label">Sponsored · {ad.sponsor}</div>
      <div className="ad-slot-headline">{ad.headline}</div>
      {ad.subheadline && <div className="ad-slot-sub">{ad.subheadline}</div>}
      <a
        className="ad-slot-cta"
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {ad.cta}
      </a>
    </div>
  )
}
