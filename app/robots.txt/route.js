import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const robotsTxt = `
    User-agent: *
    Disallow: /private/
    Allow: /

    Sitemap: ${siteUrl}/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
