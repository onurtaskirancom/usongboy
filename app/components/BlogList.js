'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const BlogList = ({ posts }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  const defaultImage = '/images/default.jpg'; // Varsayılan resim yolu

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="block max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg"
        >
          <div className="relative overflow-hidden">
            <Image
              src={
                imageErrors[post.slug] || !post.image
                  ? defaultImage
                  : post.image
              }
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-56 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
              onError={() => handleImageError(post.slug)}
            />
          </div>
          <div className="p-8 bg-white dark:bg-zinc-800">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              {post.title}
            </h2>
            <p className="text-gray-700 dark:text-slate-300">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
