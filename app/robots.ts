import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://backstretchreport.com/sitemap.xml',
    host: 'https://backstretchreport.com',
  }
}
