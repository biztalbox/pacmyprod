import Counter from './Counter';
import Link from 'next/link';


const HeroHome2 = () => {

    return (
        <section className="bg-gradient-to-b !bg-gradient-radial from-[#460a0a] to-background relative">
            <div className="flex w-full responsive_box relative items-center md:items-start container 2xl:max-w-[1700px]">
                {/* Left Section: Packaging */}
                <Link href="/kappa/cosmetic-boxes" className="md:w-1/2 z-10 py-24 2xl:py-24 text-white xl:min-h-screen relative group packaging">
                    <div className='flex flex-col gap-10 lg:gap-10 2xl:gap-20'>
                        <div className="flex flex-col items-center md:items-start">
                            <h1 className="whitespace-nowrap">Kappa Boxes</h1>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start gap-5 order-2 md:order-1">
                            <div className="text-lg text-center md:text-start flex flex-col gap-8 lg:gap-10 2xl:gap-20">
                                <p>Packaging that protects, Presentation that impresses</p>
                                <button className='w-fit self-center md:self-start bg-primary text-white px-4 py-2 rounded-md'>View Gallery</button>
                            </div>
                            <img src="/hero_packaging/kappa2.webp" alt="Packaging" className="rounded order-1 md:order-2 w-96 2xl:w-[550px] 2xl:mt-[-54px]" />
                        </div>
                    </div>
                    {/* <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div> */}
                </Link>

                {/* Right Section: Gifting */}
                <Link href="/mono/cosmetic-boxes" className="md:w-1/2 py-24 md:py-14 2xl:py-24 border-t-[1px] md:border-t-0 xl:min-h-screen border-devider text-foreground flex md:mt-auto flex-col gap-10 relative group gifting">
                    <div className="flex flex-col-reverse md:flex-col gap-10 lg:gap-10 2xl:gap-20 md:!mt-[221px] lg:!mt-[77px] lg:!ml-[23px] xl:!ml-0 2xl:!mt-0">
                        <div className="flex flex-col-reverse md:flex-col lg:flex-row items-center md:items-end gap-5 md:justify-between">
                            <img src="/hero_packaging/mono2.webp" alt="Packaging" className="rounded w-96 2xl:w-[550px] mainHeroImg" />
                            <div className="text-lg text-center md:text-end flex flex-col gap-8 lg:gap-10 2xl:gap-20">
                                <button className='w-fit self-center md:self-end bg-primary text-white px-4 py-2 rounded-md'>View Gallery</button>
                                <p>Mono Packaging: Simplicity at its peak</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <h1>Mono Cartons</h1>
                        </div>
                    </div>
                    {/* <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div> */}
                </Link>
            </div>
            <Counter />
        </section>
        
    )
}

export default HeroHome2  