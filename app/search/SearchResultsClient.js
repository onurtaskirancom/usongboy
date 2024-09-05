'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';

export default function SearchResultsClient({ searchParams }) {
  const router = useRouter();
  const query = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const currentPage = parseInt(page, 10);

  const [posts, setPosts] = useState([]);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${pageNumber}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Arama Sonuçları: &quot;{query}&quot;
        </h1>
        {currentPosts.length > 0 ? (
          <>
            <BlogList posts={currentPosts} />
            <div className="pagination mt-4 flex justify-center items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === 1
                    ? 'bg-zinc-700 text-slate-300'
                    : 'bg-zinc-800 text-slate-300'
                }`}
              >
                Önceki
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-400 text-slate-900'
                      : 'bg-zinc-800 text-slate-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-zinc-700 text-slate-300'
                    : 'bg-zinc-800 text-slate-300'
                }`}
              >
                Sonraki
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">Sonuç bulunamadı.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
