'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';
import replaceTurkishChars from '../utils/turkishChars';
import { MdOutlineDateRange } from 'react-icons/md';
import Image from 'next/image';

const MDXRemote = dynamic(() =>
  import('next-mdx-remote').then((mod) => mod.MDXRemote)
);

export default function PostPageClient({ slug }) {
  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);
  const hasIncrementedViews = useRef(false);
  const firstRender = useRef(true);
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      if (!slug || slug === 'rss.xml') return;
      try {
        const res = await fetch(`/api/mdx?slug=${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        if (isMounted) {
          if (!data || !data.frontmatter || !data.frontmatter.title) {
            router.push('/404');
          } else {
            setPost(data);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/404');
      }
    }

    fetchPost();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [slug, router]);

  useEffect(() => {
    if (
      !slug ||
      slug === 'rss.xml' ||
      hasIncrementedViews.current ||
      !firstRender.current
    ) {
      return;
    }

    firstRender.current = false;

    async function incrementViews() {
      try {
        const res = await fetch('/api/increment-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });
        if (!res.ok) {
          const errorResponse = await res.json();
          console.error('Failed to increment views:', errorResponse);
          throw new Error('Failed to increment views');
        }
        hasIncrementedViews.current = true;
      } catch (error) {
        console.error('Error in incrementViews:', error);
      }
    }

    incrementViews();
  }, [slug]);

  useEffect(() => {
    async function fetchSimilarPosts() {
      if (
        !post ||
        !post.frontmatter.categories ||
        post.frontmatter.categories.length === 0
      ) {
        return;
      }

      const category = replaceTurkishChars(
        post.frontmatter.categories[0]
      ).toLowerCase();
      try {
        const res = await fetch(
          `/api/similar-posts?category=${category}&slug=${slug}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch similar posts');
        }
        const data = await res.json();
        setSimilarPosts(data || []);
      } catch (error) {
        console.error('Error fetching similar posts:', error);
      }
    }

    if (post) {
      fetchSimilarPosts();
    }
  }, [post, slug]);

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );

  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    image: `${siteUrl}${post.frontmatter.image || '/images/default.jpg'}`,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Usongboy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Usongboy',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/Usongboy-logo.png`,
      },
    },
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${slug}`,
    },
  };

  return (
    <>
      <div className="max-w-custom mx-auto p-4 mt-16">
        <Image
          src={
            imageError || !post.frontmatter.image
              ? '/images/default.jpg'
              : post.frontmatter.image
          }
          alt={post.frontmatter.title}
          className="w-full h-auto mb-4 mx-auto rounded-lg"
          width={800}
          height={450}
          priority
          onError={() => setImageError(true)}
        />
        <h1 className="text-3xl font-bold text-center">
          {post.frontmatter.title}
        </h1>
        <div className="relative text-gray-500 text-center flex items-center justify-center mt-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <span className="relative bg-slate-200 dark:bg-gray-900 px-4 flex items=center">
            <MdOutlineDateRange className="mr-2" />
            {post.frontmatter.date}
          </span>
        </div>
        <div className="prose mx-auto text-black dark:text-zinc-200 mt-4">
          <MDXRemote {...post.mdxSource} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Kategoriler</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.frontmatter.categories.map((category) => (
              <Link
                key={category}
                href={`/kategori/${replaceTurkishChars(
                  category
                ).toLowerCase()}`}
              >
                <span className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
        {similarPosts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Benzer Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {similarPosts.map((similarPost) => (
                <Link key={similarPost.slug} href={`/${similarPost.slug}`}>
                  <div className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
                    <div
                      className="relative overflow-hidden"
                      style={{ height: '12rem' }}
                    >
                      <Image
                        src={similarPost.image || '/images/default.jpg'}
                        alt={similarPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                        width={400}
                        height={300}
                        priority
                        onError={() =>
                          setSimilarPosts((prevPosts) =>
                            prevPosts.map((post) =>
                              post.slug === similarPost.slug
                                ? { ...post, image: '/images/default.jpg' }
                                : post
                            )
                          )
                        }
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                        <h2 className="text-xl font-bold">
                          {similarPost.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900">
                      <p className="text-black dark:text-slate-300">
                        {similarPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
