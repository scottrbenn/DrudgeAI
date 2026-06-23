'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const beehiivUrl = process.env.NEXT_PUBLIC_BEEHIIV_URL
    if (beehiivUrl) {
      window.open(`${beehiivUrl}?email=${encodeURIComponent(email)}`, '_blank')
    }
    setSubmitted(true)
  }

  return (
    <div className="newsletter-banner" id="newsletter">
      <span className="newsletter-banner-label">&#9658; The Backstretch Report</span>
      {submitted ? (
        <span className="newsletter-banner-thanks">Thanks! Check your inbox to confirm.</span>
      ) : (
        <form className="newsletter-banner-form" onSubmit={handleSubmit}>
          <input
            className="newsletter-banner-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="newsletter-banner-btn" type="submit">
            Sign Up Free
          </button>
        </form>
      )}
    </div>
  )
}
