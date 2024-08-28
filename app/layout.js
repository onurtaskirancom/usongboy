import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import CanonicalHead from './components/CanonicalHead';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Usongboy | Kişisel Gelişim ve Danışmanlık Platformu',
  description:
    'Usongboy, kişisel gelişim, motivasyon, ve yaşam kalitesini artırma konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
  openGraph: {
    title: 'Usongboy | Kişisel Gelişim ve Danışmanlık Platformu',
    description:
      'Usongboy, kişisel gelişim, motivasyon, ve yaşam kalitesini artırma konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    type: 'website',
    images: [
      {
        url: `${
          process.env.SITE_URL || 'http://localhost:3000'
        }/images/usongboy-logo.png`,
        width: 800,
        height: 600,
        alt: 'Usongboy Logo',
      },
    ],
    site_name: 'Usongboy',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Usongboy',
    title: 'Usongboy | Kişisel Gelişim ve Danışmanlık Platformu',
    description:
      'Usongboy, kişisel gelişim, motivasyon, ve yaşam kalitesini artırma konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
    image: `${
      process.env.SITE_URL || 'http://localhost:3000'
    }/images/usongboy-logo.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <CanonicalHead
          siteUrl={process.env.SITE_URL || 'http://localhost:3000'}
        />
        <ThemeProvider>
          <Navbar />
          <ScrollToTop />
          <div className="pt-16">
            <div className="mx-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
