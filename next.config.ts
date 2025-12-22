import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'blog.pacmyproduct.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.pacmyproduct.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default nextConfig;
