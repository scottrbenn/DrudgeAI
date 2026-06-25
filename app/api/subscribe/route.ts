import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.BEEHIIV_API_KEY
  const pubId  = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !pubId) {
    return NextResponse.json({ error: 'Newsletter not configured' }, { status: 503 })
  }

  let email: string
  try {
    const body = await req.json()
    email = (body.email ?? '').trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'backstretchreport.com',
          utm_medium: 'website',
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('Beehiiv error', res.status, text)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
