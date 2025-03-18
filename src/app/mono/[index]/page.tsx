import SlidesContainer from '@/components/slidesContainer'
import projectData from '@/data/mono.json'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mono Cartoons",
    description: "Pack My Product is a platform that helps you pack your products for your next move.",
  };

export default async function Page({
    params,
}: {
    params: Promise<{ index: number }>
}) {
    const index = (await params).index
    return (
        <main className='redish_section'>

            <SlidesContainer currentProject={index} projectData={projectData} />
        </main>
    )
}