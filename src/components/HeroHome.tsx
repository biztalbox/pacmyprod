"use client"
import React, { useState } from 'react';
import GiftingGallery from './GiftingGallery';


const HeroHome = () => {
    const [isGalleryOpen, setGalleryOpen] = useState(false);

    const openGallery = () => {
        setGalleryOpen(true);
    };

    const closeGallery = () => {
        setGalleryOpen(false);
    };

    return (
        <>
            <section className="bg-gradient-to-b md:bg-gradient-to-r from-secondary to-foreground">
                <div className="flex w-full responsive_box justify-center items-center h-auto relative">
                    {/* Left Section: Packaging */}
                    <a href="/packaging" className="md:w-1/2 container py-5 mr-auto text-white flex flex-col gap-5 relative group md:packaging 2xl:max-w-[600px]">
                        <div className="flex flex-col gap-5 order-2 md:order-1">
                            <div className="flex flex-col items-center md:items-start">
                                <h1 className="whitespace-nowrap">Premium Packaging</h1>
                                <h3>
                                    & Sustainable Solutions
                                </h3>
                            </div>
                            <div className="mt-4 text-lg text-center md:text-start">
                                <p>Quality & Sustainability Combined</p>
                                <p>We prioritize eco-friendly materials and innovative designs</p>
                            </div>
                        </div>
                        <img src="/collage.png" alt="Packaging" className="rounded order-1 md:order-2 w-96" />
                        <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </a>

                    {/* Right Section: Gifting */}
                    <div onClick={openGallery} className="md:w-1/2 border-t-2 md:border-t-0 border-white container py-5 text-black flex md:items-end flex-col gap-5 relative group md:gifting 2xl:max-w-[600px]">

                        <img src="/collage.png" alt="Packaging" className="rounded w-96" />
                        <div className="mt-4 text-lg text-center md:text-end">
                            <p>Quality & Sustainability Combined</p>
                            <p>We prioritize eco-friendly materials and innovative designs.</p>
                        </div>

                        <div className="flex flex-col items-center md:items-end">
                            <h1>Thoughtful Gifting</h1>
                            <h3>
                                & Elegant Choices
                            </h3>
                        </div>
                        <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                    </div>
                </div>
            </section >
            <GiftingGallery isOpen={isGalleryOpen} onClose={closeGallery} />
        </>
    )
}

export default HeroHome  