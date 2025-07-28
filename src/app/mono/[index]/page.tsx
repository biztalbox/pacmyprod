import SlidesContainer from '@/components/slidesContainer'
import SchemaMarkup from '@/components/SchemaMarkup'
import projectData from '@/data/mono.json'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ index: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = projectData.find(p => p.slug === resolvedParams.index);
    
    if (!project) {
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist.",
        };
    }

    return {
        title: `${project.metaTitle} | Pac My Product`,
        description: project.metaDescription,
        alternates: {
            canonical: `https://pacmyproduct.com/mono/${project.slug}`,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const project = projectData.find(p => p.slug === resolvedParams.index);
    
    if (!project) {
        notFound();
    }

    const index = projectData.indexOf(project);
    
    return (
        <>
            <SchemaMarkup 
                project={project} 
                category="Mono Carton Packaging"
                breadcrumbName="Mono Carton Boxes"
                breadcrumbPath="mono"
                includeProduct={true}
                includeService={true}
                includeRating={true}
                serviceName="Custom Mono Carton Box Manufacturing"
                serviceDescription="Professional mono carton box manufacturing services in India. Lightweight, customizable packaging solutions perfect for cosmetics, food, pharmaceuticals, and electronics with premium printing and fast delivery."
                pageType="product"
            />
            <main className='redish_section'>
                <SlidesContainer currentProject={index} projectData={projectData} />
            </main>
        </>
    )
}