import { NextResponse } from 'next/server';
import { fetchPostBySlug } from '@/lib/wordpress';

/**
 * API route to fetch a single blog post by slug from WordPress
 * GET /api/blog/[slug]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error: any) {
    console.error('Error in blog slug API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch blog post',
      },
      { status: 500 }
    );
  }
}




