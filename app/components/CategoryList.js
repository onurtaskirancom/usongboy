'use client';

import Link from 'next/link';

const CategoryList = ({ categories }) => {
  return (
    <div className=" mb-4 flex flex-wrap justify-center space-x-4">
      {categories.length > 0 ? (
        categories.map(({ original, slug }, index) => (
          <Link
            key={index}
            href={`/kategori/${slug}`}
            className="mt-3 block text-center text-gray-800 dark:text-sky-200 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-500 dark:hover:from-gray-700 dark:hover:to-zinc-900 hover:scale-105 transition-all duration-300 py-2 px-4 rounded bg-gray-200 dark:bg-zinc-800 "
          >
            {original}
          </Link>
        ))
      ) : (
        <p>Kategori bulunamadı</p>
      )}
    </div>
  );
};

export default CategoryList;
