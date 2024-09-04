'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TrendPosts = ({ title, posts }) => {
  const [displayPosts, setDisplayPosts] = useState(posts.slice(0, 4));
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const updateDisplayPosts = () => {
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setDisplayPosts(posts.slice(0, 3));
      } else {
        setDisplayPosts(posts.slice(0, 4));
      }
    };

    updateDisplayPosts();
    window.addEventListener('resize', updateDisplayPosts);

    return () => {
      window.removeEventListener('resize', updateDisplayPosts);
    };
  }, [posts]);

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  const defaultImage = '/images/default.jpg'; 

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative overflow-hidden">
              <Image
                src={imageErrors[post.slug] ? defaultImage : post.image}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                priority
                onError={() => handleImageError(post.slug)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendPosts;
