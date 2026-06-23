'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace the action URL below with your beehiiv embed form URL
    // You get this from: beehiiv dashboard → Publication → Embed
    const beehiivUrl = process.env.NEXT_PUBLIC_BEEHIIV_URL
    if (beehiivUrl) {
      window.open(`${beehiivUrl}?email=${encodeURIComponent(email)}`, '_blank')
    }
    setSubmitted(true)
  }

  return (
    <div className="newsletter-box" id="newsletter">
      <h3>🐎 The Backstretch Report</h3>
      {submitted ? (
        <p style={{ color: '#006600', fontWeight: 'bold' }}>
          Thanks! Check your inbox to confirm.
        </p>
      ) : (
        <>
          <p>
            Top stories, tips & results — delivered to your inbox every evening.
            Free. No spam.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="newsletter-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="newsletter-btn" type="submit">
              Sign Me Up — It&apos;s Free
            </button>
          </form>
        </>
      )}
    </div>
  )
}
