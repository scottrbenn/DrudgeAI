import type { Metadata } from 'next'
import Script from 'next/script'
import StructuredData from '@/components/StructuredData'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://backstretchreport.com'),
  title: {
    default: 'Backstretch Report — Thoroughbred Horse Racing News, Tips & Results',
    template: '%s | Backstretch Report',
  },
  description:
    "The premier source for breaking thoroughbred horse racing news, expert picks, betting tips, and race results. Covering the Kentucky Derby, Breeders' Cup, Saratoga, and every major North American race. Updated every 30 minutes.",
  keywords: [
    'horse racing news',
    'thoroughbred racing news',
    'horse racing tips',
    'horse racing picks',
    'horse betting tips',
    'Kentucky Derby news',
    "Breeders' Cup",
    'horse racing results today',
    'horse racing handicapping',
    'Saratoga racing news',
    'Churchill Downs racing',
    'horse racing breaking news',
    'thoroughbred racing picks',
    'horse racing news aggregator',
    'horse racing analysis',
    'daily racing form',
    'horse racing odds',
  ],
  authors: [{ name: 'Backstretch Report', url: 'https://backstretchreport.com' }],
  creator: 'Backstretch Report',
  publisher: 'Backstretch Report',
  category: 'Sports',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://backstretchreport.com',
    siteName: 'Backstretch Report',
    title: 'Backstretch Report — Thoroughbred Horse Racing News & Tips',
    description:
      "Breaking thoroughbred horse racing news, expert picks, and betting tips. The premier North American horse racing news source, updated every 30 minutes.",
    images: [
      {
        url: '/logo.png',
        alt: 'Backstretch Report — Thoroughbred Horse Racing News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backstretch Report — Horse Racing News & Tips',
    description:
      "Breaking thoroughbred horse racing news, expert picks, and betting tips. Updated every 30 minutes.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://backstretchreport.com',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
