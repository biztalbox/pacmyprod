export default function PostSkeleton() {
  return (
    <article className="bg-background rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    </article>
  );
}

