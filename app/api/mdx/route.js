import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const filePath = path.join(process.cwd(), 'app', 'posts', `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: 'File not found', details: filePath }),
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
    const mdxSource = await serialize(content);

    return new Response(JSON.stringify({ mdxSource, frontmatter: data }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading MDX content:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to load MDX content',
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
