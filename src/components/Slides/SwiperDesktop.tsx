"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import SwiperCore from 'swiper'
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import { usePathname } from 'next/navigation';

// Define a type for the project data
interface Project {
    title: string
    desktopImage: string
    mobileImage: string
    description: string
}

// Initialize Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Keyboard])

const SwiperDesktop: React.FC<{ currentSlide: number, projectData: Project[] }> = ({ currentSlide, projectData }) => {
    // const router = useRouter();
    const projects: Project[] = projectData as Project[]
    const pathname = usePathname()

    let lastMousePosition = { x: 0, y: 0 };
    const movementThreshold = 5; // Minimum movement in pixels to trigger the effect

    const handleSlideChange = (swiper: any) => {
        const currentIndex = swiper.activeIndex;
        const pageName = pathname.split('/')[1];
        window.history.pushState(null, '', `/${pageName}/${currentIndex + 1}`);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slide: HTMLDivElement) => {
        const { clientX, clientY, currentTarget } = e;

        // Calculate the distance moved
        const deltaX = clientX - lastMousePosition.x;
        const deltaY = clientY - lastMousePosition.y;
        const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Check if the mouse has moved more than the threshold
        if (distanceMoved > movementThreshold) {
            const { top, height } = currentTarget.getBoundingClientRect();
            const offsetY = clientY - top;
            const xRotation = ((offsetY - height / 2) / height) * 20; // Adjust the multiplier for more/less tilt
            const yRotation = 0; // No horizontal tilt

            slide.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

            // Update the last mouse position
            lastMousePosition = { x: clientX, y: clientY };
        }
    };

    const handleMouseLeave = (slide: HTMLDivElement) => {
        slide.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    return (
        <Swiper
            direction="horizontal" // Change to horizontal for desktop
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={false} // Ensure only one slide is visible at a time
            scrollbar={{ draggable: true }}
            effect="coverflow"
            coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 800,
                modifier: 3,
                slideShadows: false,
            }}// Adjust for desktop
            onSlideChangeTransitionEnd={handleSlideChange}
            pagination={{ clickable: true }}
            speed={600}
            initialSlide={currentSlide <= projects.length ? currentSlide - 1 : 1}
            keyboard={{ enabled: true }}
            className='h-[80vh] xl:min-h-screen lg:h-[100vh] !w-[100%] flex items-center justify-center'
        >
            {projects.map((project, index) => (
                <SwiperSlide key={index} className='!flex items-center justify-center'>
                    <div
                        style={{
                            backgroundImage: `url(${project.desktopImage})`, // Use desktopImage
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className='desktop_slide_3d md:w-[90%] xl:w-[70%] md:h-[38vh] lg:w-[68%] lg:h-[80vh] xl:h-[90vh] my-auto slide-tilt mx-auto self-center flex items-center justify-center'
                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div className='flex flex-nowrap gap-5 justify-end items-center py-5 md:px-5 xl:pr-10 w-full h-full'>
                            <div className="content flex flex-col gap-5 text-end md:w-72 xl:w-96 ml-auto text-black">
                                <h2 className='md:text-3xl xl:text-5xl text-stroke-2 text-stroke-black text-red-600'>{project.title}</h2>
                                <p className='md:text-base xl:text-lg text-stroke-1 text-stroke-gray-200'>{project.description}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperDesktop