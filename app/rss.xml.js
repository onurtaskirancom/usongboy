import { generateRSSFeed } from '../api/rss/route';

export async function GET(req) {
  const rssFeed = await generateRSSFeed();
  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
