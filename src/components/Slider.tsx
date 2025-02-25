import React from 'react'
import MobileSlides from './Slides/MobileSlides'
import DesktopSlides from './Slides/DesktopSlides'
import { useMediaQuery } from '@mui/material';
import projectData from '@/app/data/projectData.json'

const Slider = () => {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    // const data = projectData;

    return (
        <section>
            {projectData.map((project, i) => (
                isMobile ? (
                    <MobileSlides key={i} image={project.mobileImage} text={project.title} />
                ) : (
                    <DesktopSlides key={i} image={project.desktopImage} text={project.title} />
                )
            ))}
        </section>
    )
}

export default Slider