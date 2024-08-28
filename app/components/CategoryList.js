'use client';

import Link from 'next/link';

const replaceTurkishCharacters = (str) => {
  const turkishMap = {
    ş: 's',
    Ş: 'S',
    ı: 'i',
    İ: 'I',
    ç: 'c',
    Ç: 'C',
    ü: 'u',
    Ü: 'U',
    ö: 'o',
    Ö: 'O',
    ğ: 'g',
    Ğ: 'G',
  };
  return str
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '-');
};

const CategoryList = ({ categories }) => {
  return (
    <div className=" mb-4 flex flex-wrap justify-center space-x-4">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <Link
            key={index}
            href={`/kategori/${replaceTurkishCharacters(category)}`}
            className="mt-3 block text-center text-gray-800 dark:text-sky-200 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-500 dark:hover:from-gray-700 dark:hover:to-zinc-900 hover:scale-105 transition-all duration-300 py-2 px-4 rounded bg-gray-200 dark:bg-zinc-800 "
          >
            {category}
          </Link>
        ))
      ) : (
        <p>Kategori bulunamadı</p>
      )}
    </div>
  );
};

export default CategoryList;
