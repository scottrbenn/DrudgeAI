export interface FeedConfig {
  name: string
  url: string
  priority: 1 | 2 | 3
}

export interface YoutubeChannel {
  name: string
  channelId: string
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

// North American thoroughbred racing YouTube channels (free Atom feeds, no API key needed)
export const YOUTUBE_CHANNELS: YoutubeChannel[] = [
  { name: 'America\'s Best Racing',  channelId: 'UCmIlwDelNw4_i23lWGoyElQ' },
  { name: 'FanDuel Racing',          channelId: 'UCL32QiS1RmEQMEvMJDoPMDQ' },
  { name: 'NYRA',                    channelId: 'UCxRmRUB3kX-X-_9YsNFhq3g' },
  { name: 'Churchill Downs',         channelId: 'UC19zrMS5L-w7GipuilBDfLw' },
  { name: 'Daily Racing Form',       channelId: 'UCK65Fr_wQb-jItw2KRlvDVw' },
  { name: 'Racing Dudes',            channelId: 'UCcXEgw4Z4kY-usQtedR9l-w' },
  { name: 'Horse Racing Nation',     channelId: 'UCSRW5ZfOEQDREbbC4gi0Uew' },
  { name: 'Santa Anita Park',        channelId: 'UCwfDNxjL1VPZ8iFyAVUQqZA' },
  { name: 'Del Mar Racing',          channelId: 'UC7NsS9H61hQ51JLeaHHeivA' },
  { name: 'Gulfstream Park',         channelId: 'UCe3xqxd95jp8W6m_O93L-hg' },
]

// Sponsored / ad slot content — update these with real advertiser details
export const AD_SLOT: import('./types').AdSlot = {
  headline: 'BET THE BOARD AT TWINSPIRES — $200 IN BONUS BETS FOR NEW MEMBERS',
  subheadline: 'America\'s most trusted horse racing wagering platform.',
  url: 'https://www.twinspires.com',
  sponsor: 'TwinSpires',
  cta: 'CLAIM OFFER →',
}
