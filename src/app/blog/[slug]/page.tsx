import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  fetchPostBySlug,
  fetchRankMathMetadata,
  fetchRelatedPosts,
  fetchCategories,
  TransformedPost,
  WordPressCategory,
} from "@/lib/wordpress";
import RelatedPostsSkeleton from "@/components/blog/RelatedPostsSkeleton";
import PostSkeleton from "@/components/blog/PostSkeleton";
import BlogSidebar from "@/components/blog/BlogSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata from Rank Math data
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Pac My Product",
      description: "The blog post you are looking for could not be found.",
    };
  }

  // Fetch Rank Math metadata
  const rankMathMeta = await fetchRankMathMetadata(post.id, post.link);

  if (rankMathMeta) {
    return {
      title: rankMathMeta.title || post.title,
      description: rankMathMeta.description || post.excerpt,
      alternates: {
        canonical: rankMathMeta.canonical || `https://pacmyproduct.com/blog/${post.slug}`,
      },
      openGraph: rankMathMeta.openGraph || {
        title: post.title,
        description: post.excerpt,
        type: "article",
        url: `https://pacmyproduct.com/blog/${post.slug}`,
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.imageAlt || post.title,
          },
        ],
        publishedTime: post.date,
        siteName: "Pac My Product",
      },
      twitter: rankMathMeta.twitter || {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
    };
  }

  // Fallback metadata
  return {
    title: `${post.title} | Pac My Product Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://pacmyproduct.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://pacmyproduct.com/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
      publishedTime: post.date,
      siteName: "Pac My Product",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  let post: TransformedPost | null = null;
  let rankMathMeta = null;
  let relatedPosts: TransformedPost[] = [];
  let categories: WordPressCategory[] = [];
  let error: string | null = null;

  try {
    post = await fetchPostBySlug(resolvedParams.slug);

    if (!post) {
      notFound();
    }

    // Fetch Rank Math metadata, related posts, and categories in parallel
    [rankMathMeta, relatedPosts, categories] = await Promise.all([
      fetchRankMathMetadata(post.id, post.link),
      fetchRelatedPosts(post.categories, post.id, 3),
      fetchCategories(),
    ]);
  } catch (err: any) {
    console.error("Error fetching blog post:", err);
    error = err.message || "Failed to load blog post";
    
    // If it's a 404 or not found error, redirect to not found page
    if (err.message?.includes("404") || err.message?.includes("not found")) {
      notFound();
    }
  }

  // If we have an error and no post, show error UI
  if (error && !post) {
    return (
      <main className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 text-white">
        <section className="container mx-auto py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Unable to Load Blog Post</h1>
            <p className="text-gray-400 text-lg mb-8">{error}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-primary hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Back to Blog
              </Link>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Render Rank Math Schema if available */}
      {rankMathMeta?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof rankMathMeta.schema === 'string' 
              ? rankMathMeta.schema 
              : JSON.stringify(rankMathMeta.schema),
          }}
        />
      )}

      <main className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 text-white blogPage">
        <section className="container mx-auto py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Image */}
              <div className="relative w-full mb-8 rounded-lg">
                <Image
                  src={post.image || "/blog/article-2.jpg"}
                  alt={post.imageAlt || post.title}
                  width={1200}
                  height={600}
                  className="aspect-auto"
                  priority
                />
              </div>

              {/* Post Meta */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-4">
                  {post.formattedDate || new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
              </div>

              {/* Post Content */}
              <article
                className="blog-content mb-16"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        key={relatedPost.id}
                        className="group"
                      >
                        <article className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          <div className="relative w-full overflow-hidden">
                            <Image
                              src={relatedPost.image || "/blog/article-2.jpg"}
                              width={1920}
                              height={1080}
                              alt={relatedPost.imageAlt || relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="!text-white p-6 flex-1 flex flex-col">
                            <p className="text-sm text-gray-500 mb-2">
                              {relatedPost.formattedDate || relatedPost.date}
                            </p>
                            <h3 className="!text-white text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="!text-white text-gray-600 mb-4 line-clamp-3 flex-1">
                              {relatedPost.excerpt}
                            </p>
                            <span className="text-primary font-medium inline-flex items-center">
                              Read More →
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <BlogSidebar
              categories={categories}
              currentCategorySlug={
                post.categories[0]
                  ? categories.find((cat) => cat.id === post.categories[0])?.slug
                  : undefined
              }
            />
          </div>
        </section>
      </main>
    </>
  );
}

