export interface FeedConfig {
  name: string
  url: string
  priority: 1 | 2 | 3
}

// Priority 1 = top-tier, gets "BREAKING" treatment
// Priority 2 = solid secondary sources
// Priority 3 = general / supplemental
export const FEEDS: FeedConfig[] = [
  {
    name: 'Paulick Report',
    url: 'https://paulickreport.com/feed/',
    priority: 1,
  },
  {
    name: 'BloodHorse',
    url: 'https://www.bloodhorse.com/horse-racing/rss',
    priority: 1,
  },
  {
    name: 'TDN',
    url: 'https://www.thoroughbreddailynews.com/feed/',
    priority: 2,
  },
  {
    name: 'Horse Racing Nation',
    url: 'https://www.horseracingnation.com/rss',
    priority: 2,
  },
  {
    name: 'Past the Wire',
    url: 'https://pastthewire.com/feed/',
    priority: 2,
  },
  {
    name: 'Americas Best Racing',
    url: 'https://www.americasbestracing.net/feed/',
    priority: 3,
  },
]

// Sponsored / ad slot content — update these with real advertiser details
export const AD_SLOT: import('./types').AdSlot = {
  headline: 'BET THE BOARD AT TWINSPIRES — $200 IN BONUS BETS FOR NEW MEMBERS',
  subheadline: 'America\'s most trusted horse racing wagering platform.',
  url: 'https://www.twinspires.com',
  sponsor: 'TwinSpires',
  cta: 'CLAIM OFFER →',
}
