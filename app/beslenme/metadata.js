export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/beslenme`;

  return {
    title: 'Fitongboy | Beslenme Yazıları',
    description: 'Fitongboy platformunda en iyi beslenme yazılarını keşfedin.',
    openGraph: {
      title: 'Fitongboy | Beslenme Yazıları',
      description:
        'Fitongboy platformunda en iyi beslenme yazılarını keşfedin.',
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/fitongboy-logo.png`,
          width: 800,
          height: 600,
          alt: 'Fitongboy Logo',
        },
      ],
      site_name: 'Fitongboy',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Fitongboy',
      title: 'Fitongboy | Beslenme Yazıları',
      description:
        'Fitongboy platformunda en iyi beslenme yazılarını keşfedin.',
      image: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
}
