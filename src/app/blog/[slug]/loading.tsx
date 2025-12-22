import PostContentSkeleton from "@/components/blog/PostContentSkeleton";
import RelatedPostsSkeleton from "@/components/blog/RelatedPostsSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 text-white blogPage">
      <section className="container mx-auto py-8">
        <div className="h-6 bg-gray-700 rounded w-32 mb-8 animate-pulse"></div>
        <PostContentSkeleton />
        <RelatedPostsSkeleton />
      </section>
    </main>
  );
}

