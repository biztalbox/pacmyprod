import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import SwiperCore from 'swiper'
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import projectData from '../../data/projectData.json'
import { useRouter } from 'next/navigation';

// Define a type for the project data
interface Project {
    title: string
    desktopImage: string
    mobileImage: string
    description: string
}

// Initialize Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Keyboard])

const SwiperDesktop: React.FC<{ currentSlide: number }> = ({ currentSlide }) => {
    const router = useRouter();
    const projects: Project[] = projectData as Project[]

    const handleSlideChange = (swiper: any) => {
        const currentIndex = swiper.activeIndex;
        router.replace(`/gifting/${currentIndex + 1}`);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, slide: HTMLDivElement) => {
        const { clientY, currentTarget } = e;
        const { top, height } = currentTarget.getBoundingClientRect();
        const offsetY = clientY - top;
        const xRotation = ((offsetY - height / 2) / height) * 20; // Adjust the multiplier for more/less tilt
        const yRotation = 0; // No horizontal tilt

        slide.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
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
                modifier: 2,
                slideShadows: true,
            }}// Adjust for desktop
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
            speed={1000}
            initialSlide={currentSlide <= projects.length ? currentSlide - 1 : 1}
            keyboard={{ enabled: true }}
            className='h-[100vh] w-[100vw] flex items-center justify-center'
        >
            {projects.map((project, index) => (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            backgroundImage: `url(${project.desktopImage})`, // Use desktopImage
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        }}
                        className='desktop_slide_3d w-[85%] md:h-[50vh] lg:h-[100vh] slide-tilt mx-auto self-center flex items-center justify-center'
                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div className='flex flex-nowrap gap-5 items-end px-5 py-20 w-full h-full'>
                            <div className="content flex flex-grow flex-col gap-3 w-fit">
                                <h2 className='text-5xl'>{project.title}</h2>
                                <p className='text-lg'>{project.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 text-white text-base items-center w-fit">
                                <div className="current">{index + 1}</div>
                                <span className='border-b-2 border-white w-2'></span>
                                <div className="total">{projects.length}</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperDesktop

const style = `
    .slide-tilt {
        transition: transform 0.3s;
    }
    .slide-tilt:hover {
        transform: perspective(1000px) rotateY(10deg) rotateX(10deg);
    }
`