import SlidesContainer from '@/components/slidesContainer'
import projectData from '@/data/kappa.json'

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