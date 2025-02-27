import SlidesContainer from '@/components/slidesContainer'

export default async function Page({
    params,
}: {
    params: Promise<{ index: number }>
}) {
    const index = (await params).index
    return (
        <main className='min-h-screen'>

            <SlidesContainer currentProject={index} />
        </main>
    )
}