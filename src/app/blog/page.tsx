import React from "react";
import { Metadata } from "next";
import blogData from "@/data/blog.json";

export const metadata: Metadata = {
  title: "Blog | Pac My Product - Packaging & Corporate Gifting Insights",
  description: "Explore our latest articles on corporate gifting, packaging solutions, and industry insights. Stay updated with Pac My Product's expert tips and trends.",
  alternates: {
    canonical: "https://pacmyproduct.com/blog",
  },
  openGraph: {
    title: "Blog | Pac My Product - Packaging & Corporate Gifting Insights",
    description: "Explore our latest articles on corporate gifting, packaging solutions, and industry insights. Stay updated with Pac My Product's expert tips and trends.",
    type: "website",
    url: "https://pacmyproduct.com/blog",
    images: [
      {
        url: "https://pacmyproduct.com/blog/corporate-gifting.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pac My Product Blog",
      },
    ],
    siteName: "Pac My Product",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Pac My Product - Packaging & Corporate Gifting Insights",
    description: "Explore our latest articles on corporate gifting, packaging solutions, and industry insights.",
    images: ["https://pacmyproduct.com/blog/corporate-gifting.jpg"], // Replace with your actual OG image
  },
};

const page = () => {
  // Sort blogs by date descending (most recent first)
  const sortedBlogs = [...blogData.blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main>
      <section className="container mx-auto px-4 py-16 min-h-screen text-white flex flex-col gap-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog) => (
            <a href={`/blog/${blog.slug}`} key={blog.id}>
              <article
                className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                  <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <span className="text-primary font-medium inline-flex items-center">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
