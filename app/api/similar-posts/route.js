import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import replaceTurkishChars from '../../utils/turkishChars';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category')?.toLowerCase();
  const slug = searchParams.get('slug');

  try {
    const blogDirectory = path.join(process.cwd(), 'app', 'posts');
    if (!fs.existsSync(blogDirectory)) {
      throw new Error(`Directory not found: ${blogDirectory}`);
    }

    const files = fs.readdirSync(blogDirectory);
    if (!files.length) {
      throw new Error(`No files found in directory: ${blogDirectory}`);
    }

    const posts = files
      .filter(
        (filename) =>
          filename.endsWith('.mdx') && filename.replace('.mdx', '') !== slug
      )
      .map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(markdownWithMeta);

        return {
          slug: filename.replace('.mdx', ''),
          ...frontmatter,
        };
      });

    const filteredPosts = category
      ? posts
          .filter(
            (post) =>
              post.categories &&
              post.categories
                .map((c) => replaceTurkishChars(c.toLowerCase()))
                .includes(category)
          )
          .slice(0, 4)
      : [];

    return new Response(JSON.stringify(filteredPosts), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to load posts', details: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
