import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post Not Found | Pac My Product",
  description: "The blog post you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl text-white mb-8">Blog Post Not Found</h2>
        <p className="text-gray-400 text-lg mb-12">
          The blog post you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
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
    </main>
  );
}

