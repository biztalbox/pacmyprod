"use client"
import React, { useState } from 'react';
import Hero from './Hero';
import GiftingGallery from './GiftingGallery';

const Gifting = () => {
    const [isGalleryOpen, setGalleryOpen] = useState(false);

    const openGallery = () => {
        setGalleryOpen(true);
    };

    const closeGallery = () => {
        setGalleryOpen(false);
    };

    return (
        <>
            <section className="bg-gradient-to-r from-secondary to-foreground">
                <div className="container flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-10 w-full h-auto py-16 justify-between">
                    {/* Left Section: Packaging */}
                    <div className="text-white flex flex-col gap-5 order-last md:order-first">
                        <div>
                            <h1>Thoughtful Gifting</h1>
                            <h3>
                                & Sustainable Solutions
                            </h3>
                        </div>
                        <div className="text-lg">
                            <p>Quality & Sustainability Combined</p>
                            <p>
                                Eco-friendly materials
                                Customizable packaging options
                                Durable and stylish designs
                                Commitment to reducing waste
                            </p>
                        </div>
                        <button onClick={openGallery} className="px-6 py-2 m-auto md:m-0 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit">
                            Explore Gallery
                        </button>

                    </div>

                    {/* Right Section: Gifting */}
                    <img src="/collage.png" alt="Packaging" className="mt-4 rounded order-first md:order-last" />

                </div>
            </section >
            <GiftingGallery isOpen={isGalleryOpen} onClose={closeGallery} />
        </>
    );
};

export default Gifting;