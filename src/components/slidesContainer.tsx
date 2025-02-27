"use client"
import React, { useEffect, useState } from 'react';
import MobileCarousel from './Slides/MobileCarousel';
import { useRouter } from 'next/navigation';
import ScrollContainer from './Slides/ScrollContainer';
import SwiperMobile from './Slides/SwiperMobile';
import SwiperDesktop from './Slides/SwiperDesktop';

// Define the type for a project
interface Project {
    title: string;
    desktopImage: string;
    mobileImage: string;
    description: string;
}

const SlidesContainer = ({ currentProject }: { currentProject: number }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className='w-full h-full'>
            {isMobile ? (
                <SwiperMobile currentSlide={currentProject} />
                // <ScrollContainer currentProject={currentProject} />
            ) : (
                <SwiperDesktop currentSlide={currentProject} />
            )}
        </section>
    );
}

export default SlidesContainer;