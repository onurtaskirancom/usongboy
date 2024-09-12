import { ref, get, set } from 'firebase/database';
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

    const viewRef = ref(database, `views/${slug}`);
    const snapshot = await get(viewRef);

    let currentViews = 0;
    if (snapshot.exists()) {
      currentViews = snapshot.val().views || 0;
    }

    const updatedViews = currentViews + 1;

    await set(viewRef, { views: updatedViews });

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
