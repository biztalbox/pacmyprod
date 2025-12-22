"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { WordPressCategory } from "@/lib/wordpress";

interface BlogSidebarProps {
  categories: WordPressCategory[];
  currentCategorySlug?: string;
}

export default function BlogSidebar({
  categories,
  currentCategorySlug,
}: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      const params = new URLSearchParams();
      params.set("search", searchQuery.trim());
      params.delete("category");
      params.delete("page");
      router.push(`/blog?${params.toString()}`);
      setIsSearching(false);
    }
  };

  const handleCategoryClick = (categoryId: any) => {
    const params = new URLSearchParams();
    params.set("category", categoryId.toString());
    params.delete("search");
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.push("/blog");
  };

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Search Box */}
      <div className="bg-background rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Search Posts</h3>
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-2 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? "..." : "Search"}
            </button>
          </div>
          {(searchParams.get("search") || searchParams.get("category")) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-primary hover:text-red-600 underline"
            >
              Clear filters
            </button>
          )}
        </form>
      </div>

      {/* Categories */}
      <div className="bg-background rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories found.</p>
        ) : (
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog"
                className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                  !currentCategorySlug
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                All Posts
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentCategorySlug === category.slug
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-sm opacity-75">({category.count})</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

