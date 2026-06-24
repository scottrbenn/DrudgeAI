import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse(null, { status: 400 })

  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  if (parsedUrl.protocol !== 'https:') return new NextResponse(null, { status: 400 })

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BackstretchReport/1.0)',
        Accept: 'image/webp,image/avif,image/*,*/*;q=0.8',
        Referer: `https://${parsedUrl.hostname}/`,
      },
    })

    if (!upstream.ok) return new NextResponse(null, { status: 502 })

    const contentType = upstream.headers.get('content-type') ?? ''
    if (!contentType.startsWith('image/') && !ALLOWED_EXTENSIONS.test(parsedUrl.pathname)) {
      return new NextResponse(null, { status: 400 })
    }

    const buffer = await upstream.arrayBuffer()
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
