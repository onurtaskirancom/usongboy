'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogList from './components/BlogList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setPopularPosts(
        data
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
      );
      setRecentPosts(
        data
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
      );
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
            <div className="pagination mt-4 flex justify-center">
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
