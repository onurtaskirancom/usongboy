import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/rss',
        permanent: true,
      },
    ];
  },
};

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
})(nextConfig);

export default mdxConfig;
