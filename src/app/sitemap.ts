import { MetadataRoute } from 'next'
import { fetchAllPosts } from '@/lib/wordpress'
import kappaData from '@/data/kappa.json'
import monoData from '@/data/mono.json'
import giftingData from '@/data/gifting.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pacmyproduct.com' 


  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packaging`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kappa`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mono`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gifting`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Add gifting subpages with slugs
  const giftingRoutes = giftingData.map(item => ({
    url: `${baseUrl}/gifting/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add kappa subpages with slugs
  const kappaRoutes = kappaData.map(item => ({
    url: `${baseUrl}/kappa/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add mono subpages with slugs
  const monoRoutes = monoData.map(item => ({
    url: `${baseUrl}/mono/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Fetch WordPress blog posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await fetchAllPosts()
    blogRoutes = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching WordPress posts for sitemap:', error)
    // Continue without blog posts if there's an error
  }

  return [...routes, ...giftingRoutes, ...kappaRoutes, ...monoRoutes, ...blogRoutes]
} 