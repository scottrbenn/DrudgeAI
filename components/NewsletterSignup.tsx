'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail]       = useState('')
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.error ?? 'Something went wrong — please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error — please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-box" id="newsletter-box">
      <h3>The Backstretch Report</h3>
      {status === 'success' ? (
        <p style={{ color: '#2d5a27', fontWeight: 'bold' }}>
          Thanks! Check your inbox to confirm your subscription.
        </p>
      ) : (
        <>
          <p>Top stories, tips &amp; results — delivered to your inbox every evening. Free. No spam.</p>
          <form onSubmit={handleSubmit}>
            <input
              className="newsletter-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button className="newsletter-btn" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing up…' : "Sign Me Up — It's Free"}
            </button>
            {status === 'error' && (
              <p style={{ color: '#cc0000', fontSize: '11px', marginTop: '6px' }}>
                {errorMsg}
              </p>
            )}
          </form>
        </>
      )}
    </div>
  )
}
