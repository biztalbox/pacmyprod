/**
 * WordPress API utility functions
 * Handles fetching and transforming WordPress REST API data
 */

const WORDPRESS_API_URL = "https://blog.pacmyproduct.com/wp-json/wp/v2";

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
      };
    }>;
  };
}

export interface TransformedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  formattedDate: string;
  image: string;
  imageAlt: string;
  link: string;
  categories: number[];
  categorySlugs?: string[];
  tags: number[];
}

export interface RankMathMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    publishedTime?: string;
    siteName?: string;
    authors?: string[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
  };
  schema?: any; // Rank Math schema JSON-LD
}

/**
 * Format date from WordPress format to readable format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Extract plain text from HTML excerpt
 */
function extractPlainText(html: string): string {
  // Remove HTML tags and decode entities
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Transform WordPress post to our app's format
 */
export function transformPost(post: WordPressPost): TransformedPost {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const imageUrl = featuredImage?.source_url || "/blog/article-2.jpg"; // Fallback image
  const imageAlt = featuredImage?.alt_text || post.title.rendered;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: extractPlainText(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date,
    formattedDate: formatDate(post.date),
    image: imageUrl,
    imageAlt: imageAlt,
    link: post.link,
    categories: post.categories || [],
    tags: post.tags || [],
  };
}

/**
 * Fetch all blog posts from WordPress
 */
export async function fetchAllPosts(
  perPage: number = 100
): Promise<TransformedPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${perPage}&_embed=wp:featuredmedia&status=publish&orderby=date&order=desc`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    return posts.map(transformPost);
  } catch (error: any) {
    console.error("Error fetching WordPress posts:", error);
    throw new Error(error.message || "Failed to fetch blog posts");
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchPostBySlug(
  slug: string
): Promise<TransformedPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia&status=publish`
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    if (posts.length === 0) {
      return null;
    }

    return transformPost(posts[0]);
  } catch (error) {
    console.error(`Error fetching WordPress post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a single blog post by ID
 */
export async function fetchPostById(
  id: number
): Promise<TransformedPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts/${id}?_embed=wp:featuredmedia`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const post: WordPressPost = await response.json();
    return transformPost(post);
  } catch (error) {
    console.error(`Error fetching WordPress post with id ${id}:`, error);
    return null;
  }
}

/**
 * Fetch Rank Math metadata for a post by ID
 * Rank Math typically exposes metadata via custom fields or a custom endpoint
 */
export async function fetchRankMathMetadata(
  postId: number,
  postLink?: string
): Promise<RankMathMetadata | null> {
  try {
    // Try Rank Math custom endpoint with URL first (recommended method)
    if (postLink) {
      try {
        const urlResponse = await fetch(
          `https://blog.pacmyproduct.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(postLink)}`,
          { next: { revalidate: 3600 } }
        );

        if (urlResponse.ok) {
          const data = await urlResponse.json();
          return data as RankMathMetadata;
        }
      } catch (e) {
        // Continue to next method
      }
    }

    // Try Rank Math custom endpoint with post_id
    try {
      const response = await fetch(
        `https://blog.pacmyproduct.com/wp-json/rankmath/v1/getHead?post_id=${postId}`,
        { next: { revalidate: 3600 } }
      );

      if (response.ok) {
        const data = await response.json();
        return data as RankMathMetadata;
      }
    } catch (e) {
      // Continue to fallback
    }

    // Fallback: try fetching post with custom fields
    const postResponse = await fetch(
      `${WORDPRESS_API_URL}/posts/${postId}?_embed`,
      { next: { revalidate: 3600 } }
    );
    
    if (!postResponse.ok) {
      return null;
    }

    const post: any = await postResponse.json();
    
    // Extract Rank Math data from custom fields or meta
    const rankMathMeta = post.rank_math || post.meta?.rank_math || {};
    
    return {
      title: rankMathMeta.title || post.title?.rendered,
      description: rankMathMeta.description || extractPlainText(post.excerpt?.rendered || ""),
      canonical: rankMathMeta.canonical || post.link,
      openGraph: rankMathMeta.openGraph || {
        title: post.title?.rendered,
        description: extractPlainText(post.excerpt?.rendered || ""),
        type: "article",
        url: post.link,
        images: post._embedded?.["wp:featuredmedia"]?.[0] ? [{
          url: post._embedded["wp:featuredmedia"][0].source_url,
          alt: post._embedded["wp:featuredmedia"][0].alt_text || post.title?.rendered,
        }] : undefined,
        publishedTime: post.date,
        siteName: "Pac My Product",
      },
      twitter: rankMathMeta.twitter || {
        card: "summary_large_image",
        title: post.title?.rendered,
        description: extractPlainText(post.excerpt?.rendered || ""),
        images: post._embedded?.["wp:featuredmedia"]?.[0] ? [post._embedded["wp:featuredmedia"][0].source_url] : undefined,
      },
      schema: rankMathMeta.schema || null,
    };
  } catch (error) {
    console.error(`Error fetching Rank Math metadata for post ${postId}:`, error);
    return null;
  }
}

/**
 * Fetch related posts by category IDs
 */
export async function fetchRelatedPosts(
  categoryIds: number[],
  excludePostId: number,
  limit: number = 3
): Promise<TransformedPost[]> {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      return [];
    }

    // Use the first category ID for related posts
    const categoryId = categoryIds[0];
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${categoryId}&per_page=${limit + 1}&_embed=wp:featuredmedia&status=publish&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    // Filter out the current post and limit results
    const filteredPosts = posts
      .filter(post => post.id !== excludePostId)
      .slice(0, limit)
      .map(transformPost);

    return filteredPosts;
  } catch (error) {
    console.error(`Error fetching related posts:`, error);
    return [];
  }
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface PostsResponse {
  posts: TransformedPost[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
}

/**
 * Fetch a category by slug
 */
export async function fetchCategoryBySlug(
  slug: string
): Promise<WordPressCategory | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const categories: WordPressCategory[] = await response.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all categories from WordPress
 */
export async function fetchCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100&orderby=count&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const categories: WordPressCategory[] = await response.json();
    // Filter out uncategorized (usually ID 1) and return categories with posts
    return categories.filter(cat => cat.count > 0 && cat.id !== 1);
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    return [];
  }
}

/**
 * Search posts by query
 */
export async function searchPosts(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<PostsResponse> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?search=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&_embed=wp:featuredmedia&status=publish&orderby=relevance&order=desc`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    const totalPosts = parseInt(response.headers.get("x-wp-total") || "0");
    const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1");

    return {
      posts: posts.map(transformPost),
      totalPages,
      totalPosts,
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Error searching WordPress posts:", error);
    throw new Error(error.message || "Failed to search blog posts");
  }
}

/**
 * Fetch posts by category slug
 */
export async function fetchPostsByCategory(
  categorySlug: string,
  page: number = 1,
  perPage: number = 12
): Promise<PostsResponse> {
  try {
    // First, fetch the category by slug to get its ID
    const category = await fetchCategoryBySlug(categorySlug);
    
    if (!category) {
      // Return empty result if category not found
      return {
        posts: [],
        totalPages: 0,
        totalPosts: 0,
        currentPage: page,
      };
    }

    // Now fetch posts using the category ID
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${category.id}&per_page=${perPage}&page=${page}&_embed=wp:featuredmedia&status=publish&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    const totalPosts = parseInt(response.headers.get("x-wp-total") || "0");
    const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1");

    return {
      posts: posts.map(transformPost),
      totalPages,
      totalPosts,
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Error fetching posts by category:", error);
    throw new Error(error.message || "Failed to fetch blog posts");
  }
}

/**
 * Fetch posts with pagination
 */
export async function fetchPostsPaginated(
  page: number = 1,
  perPage: number = 12
): Promise<PostsResponse> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${perPage}&page=${page}&_embed=wp:featuredmedia&status=publish&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    const totalPosts = parseInt(response.headers.get("x-wp-total") || "0");
    const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1");

    return {
      posts: posts.map(transformPost),
      totalPages,
      totalPosts,
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Error fetching paginated posts:", error);
    throw new Error(error.message || "Failed to fetch blog posts");
  }
}
