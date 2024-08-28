import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app', 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const categories = new Set();
    filenames.forEach((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);
      if (data.categories) {
        data.categories.forEach((category) => categories.add(category));
      }
    });

    return new Response(
      JSON.stringify({ categories: Array.from(categories) }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error loading categories:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to load categories',
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
