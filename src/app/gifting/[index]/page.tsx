import SlidesContainer from '@/components/slidesContainer'
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
        title: `${project.title} | Pac My Product`,
        description: project.description,
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
        <main className='redish_section'>
            <SlidesContainer currentProject={index} projectData={projectData} />
        </main>
    )
}