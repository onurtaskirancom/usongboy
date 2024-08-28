import replaceTurkishChars from '../../utils/turkishChars';

export async function generateMetadata({ params }) {
  const category = params.category;
  const formattedCategory = replaceTurkishChars(category)
    .replace(/-/g, ' ')
    .toLowerCase();

  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/kategori/${category}`;

  return {
    title: `Usongboy | ${
      formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
    } Yazıları`,
    description: `Usongboy platformunda ${
      formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
    } kategorisindeki en iyi yazıları keşfedin.`,
    openGraph: {
      title: `Usongboy | ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } Yazıları`,
      description: `Usongboy platformunda ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } kategorisindeki en iyi yazıları keşfedin.`,
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
      title: `Usongboy | ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } Yazıları`,
      description: `Usongboy platformunda ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } kategorisindeki en iyi yazıları keşfedin.`,
      image: `${siteUrl}/images/usongboy-logo.png`,
    },
  };
}
