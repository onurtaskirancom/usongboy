import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Sayfa Bulunamadı</h1>
      <p className="mb-8 text-lg">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
