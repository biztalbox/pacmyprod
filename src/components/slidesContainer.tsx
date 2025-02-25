"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MobileCarousel from './Slides/MobileCarousel';
import DesktopCarousel from './Slides/DesktopCarousel';
import projectData from '@/app/data/projectData.json'

// Define the type for a project
interface Project {
    title: string;
    desktopImage: string;
    mobileImage: string;
}

const Page = () => {
    const [index, setIndex] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIndex(searchParams.get('index'));
    }, [searchParams]);

    return (
        <section>
            {isMobile ? (
                <MobileCarousel />
            ) : (
                <DesktopCarousel />
            )}
        </section>
    )
}

export default Page;