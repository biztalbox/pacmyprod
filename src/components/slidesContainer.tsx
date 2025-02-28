"use client"
import React, { useEffect, useState } from 'react';
import SwiperMobile from './Slides/SwiperMobile';
import SwiperDesktop from './Slides/SwiperDesktop';
import Project from '@/types/projects';

const SlidesContainer = ({ currentProject, projectData }: { currentProject: number, projectData: Project[] }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className='w-full !overflow-hidden'>
            {isMobile ? (
                <SwiperMobile currentSlide={currentProject} projectData={projectData} />
            ) : (
                <SwiperDesktop currentSlide={currentProject} projectData={projectData} />
            )}
        </section>
    );
}

export default SlidesContainer;