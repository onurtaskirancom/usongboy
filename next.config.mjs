import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from '@mapbox/rehype-prism';

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
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrism],
  },
})(nextConfig);

export default mdxConfig;
