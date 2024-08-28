import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';

export async function GET(req) {
  try {
    const blogDirectory = path.join(process.cwd(), 'app', 'posts');
    const files = fs.readdirSync(blogDirectory);

    if (files.length === 0) {
      return new Response('<rss version="2.0"><channel></channel></rss>', {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }

    const posts = files.map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        title: frontmatter.title,
        id: `${process.env.SITE_URL}/${filename.replace('.mdx', '')}`,
        link: `${process.env.SITE_URL}/${filename.replace('.mdx', '')}`,
        description: frontmatter.excerpt,
        date: new Date(frontmatter.date),
      };
    });

    const feed = new Feed({
      title: 'Usongboy',
      description: 'Kişisel gelişim üzerine bir blog ve danışmanlık sitesi',
      id: process.env.SITE_URL,
      link: process.env.SITE_URL,
      language: 'tr',
      updated: new Date(posts[0]?.date || Date.now()),
      feedLinks: {
        rss2: `${process.env.SITE_URL}/rss.xml`,
      },
      author: {
        name: 'Usongboy',
      },
    });

    if (posts.length > 0) {
      posts.forEach((post) => {
        feed.addItem({
          title: post.title,
          id: post.id,
          link: post.link,
          description: post.description,
          date: post.date,
        });
      });
    }

    let rssFeed = feed.rss2();

    rssFeed = rssFeed.replace(/<generator>.*<\/generator>/, '');

    return new Response(rssFeed, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('<rss version="2.0"><channel></channel></rss>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
