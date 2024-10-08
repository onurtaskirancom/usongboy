'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaRss, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-300 dark:bg-zinc-900 text-gray-900 dark:text-white py-6">
      <div className="border-t border-gray-200 dark:border-gray-700 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="mb-4">
            <Link href="/">
              <Image
                src="/images/usongboy-logo.svg"
                alt="Usongboy Logo"
                className="h-24 w-24"
                priority
                width={90}
                height={90}
              />
            </Link>
          </div>

          {/* Menü Listesi */}
          <div className="flex flex-wrap justify-center space-x-4 mb-4 text-center">
            <Link href="/" className="hover:text-pink-600 hover:no-underline">
              Anasayfa
            </Link>
            <Link
              href="/hakkimizda"
              className="hover:text-pink-600 hover:no-underline"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="hover:text-pink-600 hover:no-underline"
            >
              İletişim
            </Link>
            <Link
              href="/danismanlik-al"
              className="hover:text-pink-600 hover:no-underline"
            >
              Danışmanlık Al
            </Link>
          </div>

          <div className="flex space-x-4 mb-4">
            <Link href="https://www.twitter.com/usongboy" aria-label="Twitter">
              <FaXTwitter className="w-6 h-6 hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.instagram.com/usongboy"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6 hover:text-pink-600" />
            </Link>
            <Link href="https://www.youtube.com" aria-label="YouTube">
              <FaYoutube className="w-6 h-6 hover:text-red-600" />
            </Link>
            <Link href="/rss.xml" aria-label="RSS">
              <FaRss className="w-6 h-6 hover:text-orange-600" />
            </Link>
          </div>

          <div className="text-center">
            <p>Copyright © {currentYear} usongboy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
