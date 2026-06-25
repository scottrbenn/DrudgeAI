'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
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
    <div className="newsletter-banner" id="newsletter">
      <span className="newsletter-banner-label">&#9658; The Backstretch Report — Free Daily Newsletter</span>
      {status === 'success' ? (
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
            disabled={status === 'loading'}
          />
          <button className="newsletter-banner-btn" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing up…' : 'Sign Up Free'}
          </button>
          {status === 'error' && (
            <span style={{ color: '#ffaaaa', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>
              {errorMsg}
            </span>
          )}
        </form>
      )}
    </div>
  )
}
