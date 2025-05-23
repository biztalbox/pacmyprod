"use client"
import React, { useEffect, useState } from 'react';
import SwiperMobile from './Slides/SwiperMobile';
import SwiperDesktop from './Slides/SwiperDesktop';
import Project from '@/types/projects';
import { usePathname } from 'next/navigation';

const SlidesContainer = ({ currentProject, projectData }: { currentProject: number, projectData: Project[] }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSlideChange = (newIndex: number) => {
        const newSlug = projectData[newIndex]?.slug;
        if (newSlug) {
            const pageName = pathname.split('/')[1];
            window.history.pushState(null, '', `/${pageName}/${newSlug}`);
        }
    };

    return (
        <section className='w-full !overflow-hidden'>
            {isMobile ? (
                <SwiperMobile 
                    currentSlide={currentProject} 
                    projectData={projectData} 
                    onSlideChange={handleSlideChange}
                    key={currentProject}
                />
            ) : (
                <SwiperDesktop 
                    currentSlide={currentProject} 
                    projectData={projectData} 
                    onSlideChange={handleSlideChange}
                    key={currentProject}
                />
            )}
        </section>
    );
}

export default SlidesContainer;