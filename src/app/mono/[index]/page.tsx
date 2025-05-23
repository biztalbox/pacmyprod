import SlidesContainer from '@/components/slidesContainer'
import projectData from '@/data/mono.json'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { index: string } }): Promise<Metadata> {
    const project = projectData.find(p => p.slug === params.index);
    
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
            canonical: `https://pacmyproduct.com/mono/${project.slug}`,
        },
    };
}

export default async function Page({
    params,
}: {
    params: { index: string }
}) {
    const project = projectData.find(p => p.slug === params.index);
    
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