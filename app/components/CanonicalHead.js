'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CanonicalHead() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const pathname = usePathname();
  const canonicalUrl = `${siteUrl}${pathname}`;

  useEffect(() => {
    const linkElementId = 'canonical-url';
    const existingLink = document.querySelector(`link[rel='canonical']`);

    if (existingLink) {
      existingLink.href = canonicalUrl;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
  }, [canonicalUrl]);

  return (
    <Script id="canonical-url" strategy="afterInteractive">
      {`
        var existingLink = document.querySelector("link[rel='canonical']");
        if (existingLink) {
          existingLink.href = '${canonicalUrl}';
        } else {
          var link = document.createElement('link');
          link.rel = 'canonical';
          link.href = '${canonicalUrl}';
          document.head.appendChild(link);
        }
      `}
    </Script>
  );
}
