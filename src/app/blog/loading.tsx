import PostListSkeleton from "@/components/blog/PostListSkeleton";

export default function Loading() {
  return (
    <main>
      <section className="container mx-auto px-4 py-16 min-h-screen text-white flex flex-col gap-16">
        <div className="h-10 bg-gray-700 rounded w-48 mx-auto animate-pulse"></div>
        <PostListSkeleton count={6} />
      </section>
    </main>
  );
}

