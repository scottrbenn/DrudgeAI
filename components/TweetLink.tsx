import type { Tweet } from '@/lib/types'
import { formatAge } from '@/lib/rss'

export default function TweetLink({ tweet }: { tweet: Tweet }) {
  const engagement = tweet.likes + tweet.retweets
  return (
    <div className="tweet-link">
      <a
        href={tweet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tweet-text"
      >
        {tweet.text.length > 200 ? tweet.text.slice(0, 197) + '…' : tweet.text}
      </a>
      <div className="tweet-meta">
        <span className="tweet-author">@{tweet.authorHandle}</span>
        <span className="tweet-stats">
          {tweet.likes > 0 && <span>♥ {tweet.likes.toLocaleString()}</span>}
          {tweet.retweets > 0 && <span>↺ {tweet.retweets.toLocaleString()}</span>}
        </span>
        <span className="tweet-age">{formatAge(tweet.pubDate)}</span>
      </div>
    </div>
  )
}
