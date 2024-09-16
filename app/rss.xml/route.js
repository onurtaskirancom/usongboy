import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';

export async function GET() {
  try {
    const siteUrl = process.env.SITE_URL || 'https://us.ongboy.com/';
    const postsDirectory = path.join(process.cwd(), 'app', 'posts');
    const files = fs.readdirSync(postsDirectory);

    const feed = new Feed({
      title: 'Usongboy Kişisel gelişim',
      description: 'Kişisel gelişim üzerine bir blog ve danışmanlık sitesi',
      id: siteUrl,
      link: siteUrl,
      language: 'tr',
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `Tüm hakları saklıdır ${new Date().getFullYear()}`,
      author: {
        name: 'Usongboy',
        email: 'ongboycom@gmail.com',
        link: siteUrl,
      },
    });

    files.forEach((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      feed.addItem({
        title: data.title,
        id: `${siteUrl}/${fileName.replace('.mdx', '')}`,
        link: `${siteUrl}/${fileName.replace('.mdx', '')}`,
        description: data.excerpt,
        content: content,
        author: [
          {
            name: 'Usongboy',
            email: 'ongboycom@gmail.com',
            link: siteUrl,
          },
        ],
        date: new Date(data.date),
      });
    });

    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
