import { NextResponse } from 'next/server';
import { fetchAllPosts } from '@/lib/wordpress';

/**
 * API route to fetch all blog posts from WordPress
 * GET /api/blog
 */
export async function GET() {
  try {
    const posts = await fetchAllPosts();
    
    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error: any) {
    console.error('Error in blog API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch blog posts',
        posts: [],
      },
      { status: 500 }
    );
  }
}



