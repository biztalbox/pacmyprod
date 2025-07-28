import SlidesContainer from '@/components/slidesContainer'
import SchemaMarkup from '@/components/SchemaMarkup'
import projectData from '@/data/gifting.json'
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
            canonical: `https://pacmyproduct.com/gifting/${project.slug}`,
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
                category="Premium Gifting Solutions"
                breadcrumbName="Gifting Packaging"
                breadcrumbPath="gifting"
                includeProduct={true}
                includeService={true}
                includeRating={true}
                serviceName="Custom Corporate Gifting Services"
                serviceDescription="Thoughtful and sustainable corporate gifting solutions in India. Custom gift packaging, hampers, and memorable gifting experiences for events, employee appreciation, and client relationships."
                pageType="product"
            />
            <main className='redish_section'>
                <SlidesContainer currentProject={index} projectData={projectData} />
            </main>
        </>
    )
}