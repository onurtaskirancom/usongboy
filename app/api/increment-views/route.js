import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(req) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug || slug === 'rss.xml') {
      //Filter files like rss.xml
      return new Response(JSON.stringify({ error: 'Invalid slug' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const filePath = path.join(process.cwd(), 'app', 'posts', `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: `File not found: ${filePath}` }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const source = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(source);

    const updatedData = {
      ...data,
      views: (data.views || 0) + 1,
    };

    const updatedContent = matter.stringify({ content, data: updatedData });
    fs.writeFileSync(filePath, updatedContent);

    return new Response(
      JSON.stringify({ success: true, views: updatedData.views }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error incrementing views:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to increment views',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
