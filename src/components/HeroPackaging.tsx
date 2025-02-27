"use client"
import React, { useState } from 'react';
import PackagingGallery from './PackagingGallery';
import Counter from './Counter';
import Link from 'next/link';


const HeroHome2 = () => {
    const [isGalleryOpen, setGalleryOpen] = useState(false);

    const openGallery = () => {
        setGalleryOpen(true);
    };

    const closeGallery = () => {
        setGalleryOpen(false);
    };

    return (
        <>
            <section className="bg-gradient-to-b md:bg-gradient-to-r from-secondary to-foreground relative">
                <div className="flex w-full responsive_box relative">
                    {/* Left Section: Packaging */}
                    <Link href="/gifting/1" className="md:w-1/2 container py-24 mr-auto text-white md:min-h-screen flex flex-col gap-10 relative group md:packaging 2xl:max-w-[600px] float-start">

                        <div className="flex flex-col items-center md:items-start">
                            <h1 className="whitespace-nowrap">Kapa Boxes</h1>
                            <h3>
                                & Sustainable Solutions
                            </h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-5 order-2 md:order-1">

                            <div className="mt-4 text-lg text-center md:text-start">
                                <p>Quality & Sustainability Combined</p>
                                <p>We prioritize eco-friendly materials and innovative designs</p>
                            </div>
                            <img src="/collage.png" alt="Packaging" className="rounded order-1 md:order-2 w-96" />
                        </div>
                        <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </Link>

                    {/* Right Section: Gifting */}
                    <Link href="/gifting/1" className="md:w-1/2 border-t-2 md:border-t-0 md:min-h-screen border-white container py-24 text-black flex md:items-end md:mt-auto flex-col gap-10 relative group md:gifting 2xl:max-w-[600px] float-end">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col md:flex-row items-start gap-5 md:justify-bet">
                                <img src="/collage.png" alt="Packaging" className="rounded w-96" />
                                <div className="mt-4 text-lg text-center md:text-end">
                                    <p>Quality & Sustainability Combined</p>
                                    <p>We prioritize eco-friendly materials and innovative designs.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:items-end">
                                <h1>Mono Cartoons</h1>
                                <h3>
                                    & Elegant Choices
                                </h3>
                            </div>

                        </div>
                        <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </Link>
                </div>
                <Counter />
            </section>
            {/* <PackagingGallery isOpen={isGalleryOpen} onClose={closeGallery} /> */}
        </>
    )
}

export default HeroHome2  