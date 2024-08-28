import Image from 'next/image';
import Footer from '../components/Footer';

export const generateMetadata = () => {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/hakkimizda`;

  return {
    title: 'Usongboy | Hakkımızda',
    description: 'Usongboy hakkında bilgi edinin.',
    openGraph: {
      title: 'Usongboy | Hakkımızda',
      description: 'Usongboy hakkında bilgi edinin.',
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
      title: 'Usongboy | Hakkımızda',
      description: 'Usongboy hakkında bilgi edinin.',
      images: `${siteUrl}/images/usongboy-logo.png`,
    },
  };
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-screen-lg mx-auto p-4 mt-16 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white mb-6">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/usongboy-logo.svg"
            alt="Usongboy Logo"
            className="w-1/3"
            width={350}
            height={350}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Hakkımızda</h1>
        <div className="space-y-4">
          <p>
            <strong>Usongboy</strong>, kişisel gelişim konusunda uzmanlaşmış bir
            platformdur. Amacımız, sizlere en güncel ve etkili kişisel gelişim
            makalelerini sunarak, kendi potansiyelinizi keşfetmenizde ve
            geliştirmenizde yardımcı olmaktır.
          </p>
          <p>
            Sitemizde kişisel gelişim, motivasyon, verimlilik ve zihinsel sağlık
            gibi konularda çeşitli makaleler bulabilirsiniz. Herkesin kendi
            yolculuğunu şekillendirmesine yardımcı olacak içerikler sunuyoruz.
          </p>
          <p>
            Ayrıca, talebe bağlı olarak kişisel danışmanlık hizmetleri de
            sunuyoruz. Kişisel hedeflerinizi belirlemek ve bu hedeflere ulaşmak
            için bir rehberlik arıyorsanız, bizimle iletişime geçebilirsiniz.
          </p>
          <p>
            <strong>Usongboy</strong> olarak, kişisel gelişim yolculuğunuzda
            size rehberlik etmeyi amaçlıyoruz. Kendi potansiyelinizi keşfetmeniz
            ve hedeflerinize ulaşmanız için gereken bilgi ve desteği sağlamak
            için buradayız.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
