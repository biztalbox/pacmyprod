import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page Not Found | Pac My Product",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="redish_section min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl text-white mb-8">Oops! Page Not Found</h2>
        <p className="text-white md:text-lg mb-12 max-w-2xl mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="inline-block bg-primary hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
} 