import SlidesContainer from '@/components/slidesContainer'
import SchemaMarkup from '@/components/SchemaMarkup'
import projectData from '@/data/kappa.json'
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
            canonical: `https://pacmyproduct.com/kappa/${project.slug}`,
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
                category="Kappa Board Packaging"
                breadcrumbName="Kappa Packaging Boxes"
                breadcrumbPath="kappa"
                includeProduct={true}
                includeService={true}
                includeRating={true}
                serviceName="Premium Kappa Board Box Manufacturing"
                serviceDescription="Heavy-duty kappa board packaging manufacturing in India. Durable, strong packaging solutions ideal for electronics, automotive parts, and premium products requiring extra protection during shipping."
                pageType="product"
            />
            <main className='redish_section'>
                <SlidesContainer currentProject={index} projectData={projectData} />
            </main>
        </>
    )
}