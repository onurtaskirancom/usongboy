export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/antrenman`;

  return {
    title: 'Fitongboy | Antrenman Yazıları',
    description: 'Fitongboy platformunda en iyi antrenman yazılarını keşfedin.',
    openGraph: {
      title: 'Fitongboy | Antrenman Yazıları',
      description:
        'Fitongboy platformunda en iyi antrenman yazılarını keşfedin.',
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
      title: 'Fitongboy | Antrenman Yazıları',
      description:
        'Fitongboy platformunda en iyi antrenman yazılarını keşfedin.',
      image: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
}
