import PostSkeleton from "./PostSkeleton";

export default function RelatedPostsSkeleton() {
  return (
    <div className="mt-16">
      <div className="h-8 bg-gray-700 rounded w-48 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

