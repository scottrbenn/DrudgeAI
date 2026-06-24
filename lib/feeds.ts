export interface FeedConfig {
  name: string
  url: string
  priority: 1 | 2 | 3
  tipsEligible?: boolean  // only professional sources qualify for Tips & Picks routing
}

export interface YoutubeChannel {
  name: string
  channelId: string
}

// Priority 1 = top-tier, gets "BREAKING" treatment
// Priority 2 = solid secondary sources
// Priority 3 = general / supplemental
export const FEEDS: FeedConfig[] = [
  // ── Tier 1: Breaking news eligible ──────────────────────────────
  { name: 'Paulick Report',       url: 'https://paulickreport.com/feed/',                    priority: 1, tipsEligible: true },
  { name: 'BloodHorse',           url: 'https://www.bloodhorse.com/horse-racing/rss',         priority: 1, tipsEligible: true },

  // ── Tier 2: Primary news + professional handicapping ─────────────
  { name: 'TDN',                  url: 'https://www.thoroughbreddailynews.com/feed/',          priority: 2, tipsEligible: true },
  { name: 'Horse Racing Nation',  url: 'https://www.horseracingnation.com/rss',               priority: 2, tipsEligible: true },
  { name: 'Past the Wire',        url: 'https://pastthewire.com/feed/',                       priority: 2, tipsEligible: true },
  { name: 'Racing Dudes',         url: 'https://www.racingdudes.com/feed/',                   priority: 2, tipsEligible: true },
  { name: 'Canadian Thoroughbred',url: 'https://canadianthoroughbred.com/feed/',              priority: 2 },
  { name: 'This Is Horse Racing', url: 'https://thisishorseracing.com/feed/',                 priority: 2 },

  // ── Tier 3: Supplemental & regional ─────────────────────────────
  { name: 'Americas Best Racing', url: 'https://www.americasbestracing.net/feed/',            priority: 3, tipsEligible: true },
  { name: 'Horse Race Insider',   url: 'https://www.horseraceinsider.com/feed/',              priority: 3, tipsEligible: true },
  { name: 'American Racehorse',   url: 'https://www.americanracehorse.com/feed/',             priority: 3, tipsEligible: true },
  { name: 'Horse Racing Scoop',   url: 'https://horseracingscoop.com/blog/feed/',             priority: 3, tipsEligible: true },
  { name: 'Raceday360',           url: 'https://raceday360.com/feed/',                        priority: 3, tipsEligible: true },
  { name: 'TwinSpires Blog',      url: 'https://blog.twinspires.com/feed/',                   priority: 3, tipsEligible: true },
  { name: 'Sports Handle',        url: 'https://sportshandle.com/feed/',                      priority: 3, tipsEligible: true },
  { name: 'NTRA',                 url: 'https://www.ntra.com/feed/',                          priority: 2 },
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

// ── Display ad slots — replace URLs with your affiliate tracking links ──────
// Positions: rightTop (right column top), rightMid (below Tips), centerTop (above Top Stories), leftBottom (below YouTube)
export const AD_SLOTS: Record<string, import('./types').AdSlot> = {
  rightTop: {
    headline: 'BET THE BOARD AT TWINSPIRES — $200 IN BONUS BETS FOR NEW MEMBERS',
    subheadline: "America's most trusted horse racing wagering platform.",
    url: 'https://www.twinspires.com',
    sponsor: 'TwinSpires',
    cta: 'CLAIM OFFER →',
  },
  rightMid: {
    headline: 'FANDUEL RACING — FIRST BET OFFER UP TO $500',
    subheadline: 'Bet live races on TVG, powered by FanDuel.',
    url: 'https://www.tvg.com',
    sponsor: 'FanDuel Racing',
    cta: 'BET NOW →',
  },
  centerTop: {
    headline: 'DRAFTKINGS RACING — BET $5, GET $150 IN BONUS BETS',
    subheadline: 'Horse racing wagering available in 40+ states.',
    url: 'https://www.draftkings.com/racing',
    sponsor: 'DraftKings Racing',
    cta: 'GET OFFER →',
  },
  leftBottom: {
    headline: 'NYRA BETS — $200 FIRST DEPOSIT BONUS FOR NEW ACCOUNTS',
    subheadline: 'Bet New York racing and tracks nationwide.',
    url: 'https://www.nyrabets.com',
    sponsor: 'NYRA Bets',
    cta: 'JOIN NOW →',
  },
}

// ── In-feed sponsored links — injected into article lists, styled like headlines ─
// Replace URLs with your affiliate tracking links when you sign up
export const SPONSORED_LINKS: import('./types').SponsoredLink[] = [
  {
    headline: 'NEW MEMBERS GET $200 BONUS AT TWINSPIRES — FIRST WAGER MATCHED',
    url: 'https://www.twinspires.com',
    sponsor: 'TwinSpires',
  },
  {
    headline: "FANDUEL RACING: BET THE PREP SEASON — UP TO $500 FIRST BET OFFER",
    url: 'https://www.tvg.com',
    sponsor: 'FanDuel Racing',
  },
  {
    headline: "DRAFTKINGS RACING — BET $5 GET $150 IN BONUS BETS, 40+ STATES",
    url: 'https://www.draftkings.com/racing',
    sponsor: 'DraftKings Racing',
  },
  {
    headline: "NYRA BETS: AMERICA'S PREMIER RACING PLATFORM — $200 WELCOME BONUS",
    url: 'https://www.nyrabets.com',
    sponsor: 'NYRA Bets',
  },
]
