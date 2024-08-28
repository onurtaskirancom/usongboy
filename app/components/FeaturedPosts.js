'use client';

import Link from 'next/link';
import Image from 'next/image';

const FeaturedPosts = ({ posts }) => {
  if (posts.length < 3) return null;

  const [firstPost, secondPost, thirdPost] = posts.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-4 md:px-4">
      <div className="md:col-span-2">
        <Link
          href={`/${firstPost.slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <div className="relative w-full h-56 md:h-96">
            <Image
              src={firstPost.image}
              alt={firstPost.title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-lg md:text-xl font-bold">
                {firstPost.title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:space-y-4">
        <Link
          href={`/${secondPost.slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 relative overflow-hidden flex-grow"
        >
          <div className="relative w-full h-56 md:h-full">
            <Image
              src={secondPost.image}
              alt={secondPost.title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h2 className="text-sm md:text-lg font-bold">
                {secondPost.title}
              </h2>
            </div>
          </div>
        </Link>
        <Link
          href={`/${thirdPost.slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 relative overflow-hidden flex-grow"
        >
          <div className="relative w-full h-56 md:h-full">
            <Image
              src={thirdPost.image}
              alt={thirdPost.title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h2 className="text-sm md:text-lg font-bold">
                {thirdPost.title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;
