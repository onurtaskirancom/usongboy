'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogList from './components/BlogList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// A helper function that defines the date
const parseDate = (dateString) => {
  // If the date format is 'day-month-year', convert it to 'year-month-day'
  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts[2].length === 4) {
      // 'day-month-year' format
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    } else {
      // 'year-month-day' format
      return new Date(dateString);
    }
  }
  return new Date(dateString); // If it is already a valid date format
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return;
      }
      const data = await res.json();

      // Sort posts by date in reverse order (most recent dates first)
      const sortedPosts = data.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );

      setPosts(sortedPosts);

      // Sort popular posts by number of views
      setPopularPosts(
        sortedPosts
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
      );

      // Sort newest posts by date and get top 5 posts
      setRecentPosts(sortedPosts.slice(0, 5));
    }

    async function fetchCategories() {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        console.error('Failed to fetch categories');
        return;
      }
      const data = await res.json();
      setCategories(data.categories);
    }

    fetchPosts();
    fetchCategories();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex flex-col pt-16">
        <div className="flex flex-col md:flex-row">
          <main className="w-full md:w-3/4 p-4">
            <BlogList posts={currentPosts} />
            <div className="pagination mt-4 flex flex-wrap justify-center items-center space-x-2 space-y-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mt-2 mx-1 rounded text-lg ${
                  currentPage === 1
                    ? 'bg-zinc-700 text-slate-300 cursor-default'
                    : 'bg-zinc-800 text-slate-300 cursor-pointer'
                }`}
              >
                Önceki
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded text-lg ${
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
                className={`px-4 py-2 mx-1 rounded text-lg ${
                  currentPage === totalPages
                    ? 'bg-zinc-700 text-slate-300 cursor-default'
                    : 'bg-zinc-800 text-slate-300 cursor-pointer'
                }`}
              >
                Sonraki
              </button>
            </div>
          </main>
          <aside className="w-full md:w-1/4 p-4">
            <Sidebar
              categories={categories}
              popularPosts={popularPosts}
              recentPosts={recentPosts}
            />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
