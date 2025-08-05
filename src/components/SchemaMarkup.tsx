interface SchemaData {
    id: number;
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    desktopImage: string;
    mobileImage: string;
    description: string;
}

interface SchemaMarkupProps {
    project?: SchemaData;
    category: string;
    breadcrumbName: string;
    breadcrumbPath: string;
    includeProduct?: boolean;
    includeService?: boolean;
    includeRating?: boolean;
    includeReviews?: boolean;
    serviceName?: string;
    serviceDescription?: string;
    pageType?: 'product' | 'category' | 'home';
    price?: string;
}

function generateProductSchema(project: SchemaData, category: string, price: string = "500"): object {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": project.title,
        "description": project.description,
        "image": [
            `https://pacmyproduct.com${project.desktopImage}`,
            `https://pacmyproduct.com${project.mobileImage}`
        ],
        "brand": {
            "@type": "Brand",
            "name": "Pac My Product"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Pac My Product",
            "url": "https://pacmyproduct.com"
        },
        "category": category,
        "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2025-12-31",
            "seller": {
                "@type": "Organization",
                "name": "Pac My Product"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        }
    };
}

function generateServiceSchema(
    serviceName: string,
    serviceDescription: string,
    category: string
): object {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceName,
        "description": serviceDescription,
        "provider": {
            "@type": "Organization",
            "name": "Pac My Product",
            "url": "https://pacmyproduct.com",
            "logo": "https://pacmyproduct.com/logo.webp",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "info@pacmyproduct.com"
            }
        },
        "serviceType": category,
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Packaging Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Packaging Design"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Bulk Manufacturing"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Premium Printing Services"
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "342",
            "bestRating": "5",
            "worstRating": "1"
        }
    };
}

function generateReviewSchema(project: SchemaData | undefined, serviceName: string | undefined, category: string): object {
    const itemReviewed = project ? {
        "@type": "Product",
        "name": project.title,
        "description": project.description,
        "image": `https://pacmyproduct.com${project.desktopImage}`,
        "brand": {
            "@type": "Brand",
            "name": "Pac My Product"
        }
    } : {
        "@type": "Service",
        "name": serviceName || `${category} Manufacturing Services`,
        "provider": {
            "@type": "Organization",
            "name": "Pac My Product"
        }
    };

    return {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": itemReviewed,
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": {
            "@type": "Person",
            "name": "Verified Customer"
        },
        "reviewBody": `Excellent ${project ? 'product' : 'service'} quality from Pac My Product. Highly recommended for professional packaging solutions.`,
        "datePublished": "2024-01-15"
    };
}

function generateAggregateRatingSchema(project: SchemaData | undefined, serviceName: string | undefined, category: string): object {
    const itemReviewed = project ? {
        "@type": "Product",
        "name": project.title,
        "brand": {
            "@type": "Brand",
            "name": "Pac My Product"
        }
    } : {
        "@type": "Service",
        "name": serviceName || `${category} Manufacturing Services`,
        "provider": {
            "@type": "Organization",
            "name": "Pac My Product"
        }
    };

    return {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": itemReviewed,
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
    };
}

function generateBreadcrumbSchema(
    project: SchemaData | undefined, 
    breadcrumbName: string, 
    breadcrumbPath: string,
    pageType: string = 'product'
): object {
    const baseItems = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pacmyproduct.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": breadcrumbName,
            "item": `https://pacmyproduct.com/${breadcrumbPath}`
        }
    ];

    if (project && pageType === 'product') {
        baseItems.push({
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `https://pacmyproduct.com/${breadcrumbPath}/${project.slug}`
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": baseItems
    };
}

function generateOrganizationSchema(): object {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Pac My Product",
        "url": "https://pacmyproduct.com",
        "logo": "https://pacmyproduct.com/logo.webp",
        "description": "Leading packaging solutions provider in India specializing in mono carton boxes, kappa cartons, and premium gifting packaging.",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "info@pacmyproduct.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        }
    };
}

export default function SchemaMarkup({ 
    project,
    category, 
    breadcrumbName, 
    breadcrumbPath,
    includeProduct = true,
    includeService = true,
    includeRating = true,
    includeReviews = false,
    serviceName,
    serviceDescription,
    pageType = 'product',
    price = "500"
}: SchemaMarkupProps) {
    const organizationSchema = generateOrganizationSchema();
    const breadcrumbSchema = generateBreadcrumbSchema(project, breadcrumbName, breadcrumbPath, pageType);
    
    // Generate service schema with dynamic content
    const defaultServiceName = serviceName || `${category} Manufacturing Services`;
    const defaultServiceDescription = serviceDescription || `Professional ${category.toLowerCase()} manufacturing and design services in India. Custom packaging solutions with premium quality materials and fast delivery.`;
    
    const schemas = [organizationSchema, breadcrumbSchema];
    
    // Add product schema if project exists and includeProduct is true
    if (project && includeProduct) {
        const productSchema = generateProductSchema(project, category, price);
        schemas.push(productSchema);
    }
    
    // Add service schema if includeService is true
    if (includeService) {
        const serviceSchema = generateServiceSchema(defaultServiceName, defaultServiceDescription, category);
        schemas.push(serviceSchema);
    }

    // Add aggregate rating schema if includeRating is true
    if (includeRating) {
        const aggregateRatingSchema = generateAggregateRatingSchema(project, defaultServiceName, category);
        schemas.push(aggregateRatingSchema);
    }

    // Add review schema if includeReviews is true
    if (includeReviews) {
        const reviewSchema = generateReviewSchema(project, defaultServiceName, category);
        schemas.push(reviewSchema);
    }

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </>
    );
} 