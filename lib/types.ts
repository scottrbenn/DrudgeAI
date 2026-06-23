export interface Article {
  id: string
  title: string
  url: string
  source: string
  pubDate: Date
  isNew: boolean      // less than 3 hours old
  isBreaking: boolean // from top-tier source, less than 6 hours old
  imageUrl?: string   // first image found in feed item, if any
}

export interface AdSlot {
  headline: string
  subheadline?: string
  url: string
  sponsor: string
  cta: string
}
