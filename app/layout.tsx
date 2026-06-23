import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Backstretch Report — The Inside Track on Horse Racing',
  description:
    'Breaking news, tips, results, and daily coverage from the world of thoroughbred horse racing. Updated throughout the day.',
  keywords: 'horse racing, thoroughbred, betting tips, racing news, Kentucky Derby, Breeders Cup',
  openGraph: {
    title: 'Backstretch Reporter',
    description: 'Breaking news and tips from the world of horse racing.',
    type: 'website',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
