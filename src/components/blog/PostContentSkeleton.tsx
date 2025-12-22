export default function PostContentSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Featured Image Skeleton */}
      <div className="w-full h-64 md:h-96 bg-gray-700 rounded-lg mb-8"></div>
      
      {/* Date Skeleton */}
      <div className="h-4 bg-gray-700 rounded w-32 mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-8 bg-gray-700 rounded w-full"></div>
        <div className="h-8 bg-gray-700 rounded w-5/6"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-4/5"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
      
      {/* Paragraph Skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
}

