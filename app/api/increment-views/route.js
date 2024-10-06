import { ref, runTransaction } from 'firebase/database';
import { database } from '../../utils/firebaseConfig';

export async function POST(req) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Invalid slug' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const postRef = ref(database, `views/${slug}`);

    let updatedViews = 0;

    await runTransaction(postRef, (currentData) => {
      if (currentData === null) {
        updatedViews = 1;
        return { views: updatedViews };
      } else {
        const currentViews = currentData.views || 0;
        updatedViews = currentViews + 1;
        return { views: updatedViews };
      }
    });

    return new Response(
      JSON.stringify({ success: true, views: updatedViews }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
