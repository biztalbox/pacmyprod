import React from "react";
import { Metadata } from "next";
import {
  fetchPostsPaginated,
  fetchPostsByCategory,
  searchPosts,
  fetchCategories,
  TransformedPost,
  PostsResponse,
  WordPressCategory,
} from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Pagination from "@/components/blog/Pagination";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const search = params.search as string | undefined;
  const category = params.category as string | undefined;
  const page = params.page as string | undefined;

  let title = "Blog | Pac My Product - Packaging & Corporate Gifting Insights";
  let description =
    "Explore our latest articles on corporate gifting, packaging solutions, and industry insights. Stay updated with Pac My Product's expert tips and trends.";
  let canonical = "https://pacmyproduct.com/blog";

  if (search) {
    title = `Search Results for "${search}" | Pac My Product Blog`;
    description = `Search results for "${search}" on Pac My Product blog.`;
    canonical = `https://pacmyproduct.com/blog?search=${encodeURIComponent(search)}`;
  } else if (category) {
    // We'll fetch category name in the page component
    canonical = `https://pacmyproduct.com/blog?category=${category}`;
  }

  if (page && parseInt(page) > 1) {
    canonical += `${canonical.includes("?") ? "&" : "?"}page=${page}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [
        {
          url: "https://pacmyproduct.com/blog/corporate-gifting.jpg",
          width: 1200,
          height: 630,
          alt: "Pac My Product Blog",
        },
      ],
      siteName: "Pac My Product",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://pacmyproduct.com/blog/corporate-gifting.jpg"],
    },
  };
}

async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search as string | undefined;
  const categorySlug = params.category as string | undefined;
  const pageNum = params.page ? parseInt(params.page as string) : 1;

  let postsData: PostsResponse | null = null;
  let categories: WordPressCategory[] = [];
  let error: string | null = null;
  let categoryName: string | undefined;

  // Fetch categories
  try {
    categories = await fetchCategories();
    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      categoryName = category?.name;
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  // Fetch posts based on search params
  try {
    if (search) {
      postsData = await searchPosts(search, pageNum, 12);
    } else if (categorySlug) {
      postsData = await fetchPostsByCategory(categorySlug, pageNum, 12);
    } else {
      postsData = await fetchPostsPaginated(pageNum, 12);
    }
  } catch (err: any) {
    console.error("Error fetching blog posts:", err);
    error = err.message || "Failed to fetch blog posts";
    if (err.message?.includes("404") || err.message?.includes("not found")) {
      notFound();
    }
  }

  // If we have an error and no posts, show error UI
  if (error && (!postsData || postsData.posts.length === 0)) {
    return (
      <main>
        <section className="container mx-auto px-4 py-16 min-h-screen text-white flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Unable to Load Blog Posts</h1>
            <p className="text-gray-400 text-lg mb-8">{error}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="bg-primary hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Return to Home
              </Link>
              <Link
                href="/blog"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Try Again
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!postsData) {
    notFound();
  }

  const { posts, totalPages, currentPage, totalPosts } = postsData;

  // Build page title
  let pageTitle = "Our Blog";
  if (search) {
    pageTitle = `Search Results for "${search}"`;
  } else if (categoryName) {
    pageTitle = categoryName;
  }

  return (
    <main>
      <section className="container mx-auto px-4 py-16 pt-20 min-h-screen text-white">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
              {(search || categoryName) && (
                <p className="text-gray-400">
                  {totalPosts} {totalPosts === 1 ? "post" : "posts"} found
                </p>
              )}
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">
                  {search
                    ? `No posts found for "${search}"`
                    : "No blog posts found."}
                </p>
                <Link
                  href="/blog"
                  className="text-primary hover:underline"
                >
                  View All Posts
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {posts.map((blog: TransformedPost) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id}>
                      <article className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative w-full overflow-hidden">
                          <Image
                            src={blog.image || "/blog/article-2.jpg"}
                            width={1200}
                            height={600}
                            alt={blog.imageAlt || blog.title}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <p className="text-sm text-gray-500 mb-2">
                            {blog.formattedDate || blog.date}
                          </p>
                          <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                            {blog.title}
                          </h2>
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                            {blog.excerpt}
                          </p>
                          <span className="text-primary font-medium inline-flex items-center">
                            Read More →
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchParams={new URLSearchParams(
                    Object.entries(params)
                      .filter(([_, v]) => v !== undefined)
                      .map(([k, v]) => [k, String(v)])
                  )}
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar
            categories={categories}
            currentCategorySlug={categorySlug}
          />
        </div>
      </section>
    </main>
  );
}

export default page;
