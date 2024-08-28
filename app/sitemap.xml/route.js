import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  const postsDirectory = path.join(process.cwd(), 'app/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const staticPages = [
    '',
    'antrenman',
    'beslenme',
    'hakkimizda',
    'iletisim',
    'kocluk-al',
  ];

  const dynamicPages = filenames.map((filename) => {
    return `posts/${filename.replace('.mdx', '')}`;
  });

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}/${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
