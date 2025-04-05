import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pacmyproduct.com' // Replace with your actual domain

  // Gifting subpages
  const giftingPages = [
    'corporate-gifting',
    'joining-kit',
    'festive-gifting',
    'self-care-and-wellness-kits',
    'subscription-gifts',
    'milestone-celebration',
    'home-and-kitchen-kit',
    'artisan-and-handmade-gifts'
  ]

  // Kappa subpages
  const kappaPages = [
    'cosmetic-boxes',
    'perfume-boxes',
    'liquor-boxes',
    'electronic',
    'automobile',
    'gifting'
  ]

  // Mono subpages
  const monoPages = [
    'cosmetic-boxes',
    'perfume-boxes',
    'liquor-boxes',
    'lighting',
    'automobile',
    'food-and-beverage',
    'pharmaceutical',
    'agriculture'
  ]

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
  ]

  // Add gifting subpages (8 pages)
  const giftingRoutes = Array.from({ length: 8 }, (_, i) => ({
    url: `${baseUrl}/gifting/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add kappa subpages (6 pages)
  const kappaRoutes = Array.from({ length: 6 }, (_, i) => ({
    url: `${baseUrl}/kappa/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add mono subpages (8 pages)
  const monoRoutes = Array.from({ length: 8 }, (_, i) => ({
    url: `${baseUrl}/mono/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...giftingRoutes, ...kappaRoutes, ...monoRoutes]
} 