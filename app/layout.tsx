import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Backstretch Reporter — The Inside Track on Horse Racing',
  description:
    'Breaking news, tips, results, and daily coverage from the world of thoroughbred horse racing. Updated throughout the day.',
  keywords: 'horse racing, thoroughbred, betting tips, racing news, Kentucky Derby, Breeders Cup',
  openGraph: {
    title: 'Backstretch Reporter',
    description: 'Breaking news and tips from the world of horse racing.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
