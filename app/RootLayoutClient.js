'use client'; 

import { useEffect } from 'react'; 
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import { useRouter } from 'next/navigation'; 

export default function RootLayoutClient({ children }) {
  const router = useRouter(); 

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-ZH4XMXEV4Y', {
        page_path: url,
      });
    };

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZH4XMXEV4Y';
    script.async = true;
    document.head.appendChild(script);

    const scriptInline = document.createElement('script');
    scriptInline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZH4XMXEV4Y');
    `;
    document.head.appendChild(scriptInline);

    router.events?.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
      document.head.removeChild(script);
      document.head.removeChild(scriptInline);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <Navbar />
      <ScrollToTop />
      <div className="pt-16">
        <div className="mx-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
}
