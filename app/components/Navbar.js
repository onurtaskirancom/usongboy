'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { FaMoon, FaSearch } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false); 
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image
                src="/images/usongboy-logo.svg"
                alt="Usongboy Logo"
                width={95}
                height={95}
                priority
                className="w-20 h-20 sm:w-16 sm:h-16"
              />
              <span className="ml-2 text-3xl font-bold text-gray-800 dark:text-slate-300 sm:text-2xl">
                Usongboy
              </span>
            </Link>
          </div>
          <div className="hidden xl:flex items-center space-x-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                className="px-3 py-1 w-80 rounded-md text-sm bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded-md flex items-center"
              >
                <FaSearch />
              </button>
            </form>

            <Link
              href="/"
              className="text-gray-800 dark:text-slate-300 hover:text-gray-500 dark:hover:text-slate-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              Anasayfa
            </Link>
            <Link
              href="/hakkimizda"
              className="text-gray-800 dark:text-slate-300 hover:text-gray-500 dark:hover:text-slate-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              Hakkımızda
            </Link>
            <Link
              href="/danismanlik-al"
              className="text-gray-800 dark:text-slate-300 hover:text-gray-500 dark:hover:text-slate-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              Danışmanlık Al
            </Link>
            <Link
              href="/iletisim"
              className="text-gray-800 dark:text-slate-300 hover:text-gray-500 dark:hover:text-slate-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              İletişim
            </Link>
            <button
              onClick={toggleTheme}
              className="text-gray-800 dark:text-white hover:text-gray-500 dark:hover:text-slate-400 px-3 py-2 rounded-md text-xl font-medium flex items-center"
            >
              {theme === 'dark' ? <MdOutlineLightMode /> : <FaMoon />}
            </button>
          </div>
          <div className="flex xl:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-[3.25rem]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`xl:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Anasayfa
          </Link>
          <Link
            href="/hakkimizda"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Hakkımızda
          </Link>
          <Link
            href="/danismanlik-al"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Danışmanlık Al
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-1 mt-2"
          >
            <input
              type="text"
              className="px-2 py-1 rounded-md text-sm bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none w-full"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="text-gray-800 dark:text-white"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
