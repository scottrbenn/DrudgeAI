export default function StructuredData() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Backstretch Report',
    alternateName: 'The Backstretch Report',
    url: 'https://backstretchreport.com',
    description:
      'The premier thoroughbred horse racing news aggregator. Breaking news, expert picks, and betting tips updated every 30 minutes.',
    inLanguage: 'en-US',
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Backstretch Report',
    alternateName: 'The Backstretch Report',
    url: 'https://backstretchreport.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://backstretchreport.com/logo.png',
    },
    description:
      "Breaking thoroughbred horse racing news, tips, picks, and results. The premier North American horse racing news aggregator covering the Kentucky Derby, Breeders' Cup, Saratoga, Churchill Downs, and every major race.",
    email: 'thebackstretchreport@gmail.com',
    foundingDate: '2025',
    knowsAbout: [
      'Thoroughbred Horse Racing',
      'Horse Race Betting',
      'Horse Racing Handicapping',
      'Kentucky Derby',
      "Breeders' Cup",
      'Saratoga Racing',
      'Churchill Downs',
      'Horse Racing Picks',
      'Horse Racing Results',
      'Horse Racing News',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Horse Racing Fans, Bettors, and Handicappers',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  )
}
