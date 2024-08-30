export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/danismanlik-al`;

  return {
    title: 'Usongboy | Danışmanlık Al',
    description: 'Usongboy ile kişisel gelişim danışmanlığı talebinde bulunun.',
    openGraph: {
      title: 'Usongboy | Danışmanlık Al',
      description:
        'Usongboy ile kişisel gelişim danışmanlığı talebinde bulunun.',
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
      site: '@usongboy',
      title: 'Usongboy | Danışmanlık Al',
      description:
        'Usongboy ile kişisel gelişim danışmanlığı talebinde bulunun.',
      images: `${siteUrl}/images/usongboy-logo.png`,
    },
  };
}
