import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://stackup.xyz';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin/', '/api/config/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
