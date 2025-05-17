import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";

// Get blog post from the JSON data
const getBlogPost = async (slug: string) => {
  return blogData.blogs.find(blog => blog.slug === slug);
};

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogPost(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found | Pac My Product",
      description: "The requested blog post could not be found.",
      alternates: {
        canonical: "https://pacmyproduct.com/blog/404",
      },
    };
  }

  const canonicalUrl = `https://pacmyproduct.com/blog/${blog.slug}`;
  const ogImageUrl = blog.image.startsWith('http') ? blog.image : `https://pacmyproduct.com${blog.image}`;

  return {
    title: `${blog.title} | Pac My Product Blog`,
    description: blog.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.date,
      siteName: "Pac My Product",
      authors: ["Pac My Product"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [ogImageUrl],
      creator: "@pacmyproduct", // Replace with your Twitter handle
    },
    other: {
      "article:published_time": blog.date,
      "article:section": "Packaging & Gifting",
      "article:tag": ["Packaging", "Corporate Gifting", "Business Solutions"],
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <article className="container mx-auto px-4 py-16 min-h-screen text-white">
        <div className="max-w-3xl mx-auto">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 mb-8">{blog.date}</p>
          <div className="prose prose-invert max-w-none">
            {blog.content}
          </div>
        </div>
      </article>
    </main>
  );
} 