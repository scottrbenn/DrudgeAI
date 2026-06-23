import type { Tweet } from './types'

// Targets viral horse racing content — excludes retweets and replies to avoid noise
const QUERY =
  '(horse racing OR thoroughbred OR "kentucky derby" OR "breeders cup" OR "triple crown" OR "Saratoga" OR "Churchill Downs" OR Keeneland) lang:en -is:retweet -is:reply'

// Minimum combined engagement for a tweet to appear
const MIN_ENGAGEMENT = 75

export async function fetchTrendingRacingTweets(): Promise<Tweet[]> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN
  if (!bearerToken) return []

  try {
    const params = new URLSearchParams({
      query: QUERY,
      max_results: '25',
      'tweet.fields': 'public_metrics,created_at,author_id',
      expansions: 'author_id',
      'user.fields': 'name,username',
    })

    const res = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?${params}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
        // Cache Twitter results for 4 hours to keep API costs low (~$18/month)
        next: { revalidate: 14400 },
      }
    )

    if (!res.ok) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userMap = new Map<string, any>(
      (data.includes?.users ?? []).map((u: any) => [u.id, u])
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tweets: Tweet[] = (data.data ?? []).map((t: any) => {
      const user = userMap.get(t.author_id)
      return {
        id: t.id,
        text: t.text,
        author: user?.name ?? 'Unknown',
        authorHandle: user?.username ?? 'unknown',
        url: `https://x.com/${user?.username ?? 'i'}/status/${t.id}`,
        likes: t.public_metrics?.like_count ?? 0,
        retweets: t.public_metrics?.retweet_count ?? 0,
        pubDate: new Date(t.created_at),
      }
    })

    return tweets
      .filter((t) => t.likes + t.retweets >= MIN_ENGAGEMENT)
      .sort((a, b) => (b.likes + b.retweets * 2) - (a.likes + a.retweets * 2))
      .slice(0, 8)
  } catch {
    return []
  }
}
