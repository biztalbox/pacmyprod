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
    serviceName?: string;
    serviceDescription?: string;
    pageType?: 'product' | 'category' | 'home';
}

function generateProductSchema(project: SchemaData, category: string): object {
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
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
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

function generateAggregateRatingSchema(): object {
    return {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "Pac My Product",
            "url": "https://pacmyproduct.com"
        },
        "ratingValue": "4.8",
        "reviewCount": "289",
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
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "289",
            "bestRating": "5",
            "worstRating": "1"
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
    serviceName,
    serviceDescription,
    pageType = 'product'
}: SchemaMarkupProps) {
    const organizationSchema = generateOrganizationSchema();
    const breadcrumbSchema = generateBreadcrumbSchema(project, breadcrumbName, breadcrumbPath, pageType);
    
    // Generate service schema with dynamic content
    const defaultServiceName = serviceName || `${category} Manufacturing Services`;
    const defaultServiceDescription = serviceDescription || `Professional ${category.toLowerCase()} manufacturing and design services in India. Custom packaging solutions with premium quality materials and fast delivery.`;
    
    const schemas = [organizationSchema, breadcrumbSchema];
    
    // Add product schema if project exists and includeProduct is true
    if (project && includeProduct) {
        const productSchema = generateProductSchema(project, category);
        schemas.push(productSchema);
    }
    
    // Add service schema if includeService is true
    if (includeService) {
        const serviceSchema = generateServiceSchema(defaultServiceName, defaultServiceDescription, category);
        schemas.push(serviceSchema);
    }
    
    // Add standalone aggregate rating if includeRating is true and no product
    if (includeRating && (!project || !includeProduct)) {
        const ratingSchema = generateAggregateRatingSchema();
        schemas.push(ratingSchema);
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