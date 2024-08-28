export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/iletisim`;

  return {
    title: 'Usongboy | İletişim',
    description: 'Usongboy ile iletişime geçin.',
    openGraph: {
      title: 'Usongboy | İletişim',
      description: 'Usongboy ile iletişime geçin.',
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/usongboy-logo.png`,
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
      title: 'Usongboy | İletişim',
      description: 'Usongboy ile iletişime geçin.',
      image: `${siteUrl}/images/usongboy-logo.png`,
    },
  };
}
