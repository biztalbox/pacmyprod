import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import SwiperCore from 'swiper'
import { EffectCoverflow, Pagination } from 'swiper/modules';
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
SwiperCore.use([EffectCoverflow, Pagination])

const SwiperMobile: React.FC<{ currentSlide: number }> = ({ currentSlide }) => {
    const router = useRouter();
    // Ensure projectData is typed correctly
    const projects: Project[] = projectData as Project[]

    const handleSlideChange = (swiper: any) => {
        const slides = swiper.slides;
        slides.forEach((slide: HTMLElement) => {
            // slide.querySelector('.mobile_slide_3d')?.classList.remove('animate');
            // slide.style.transform = ''; // Reset transform
        });
        const currentIndex = swiper.activeIndex;
        router.replace(`/gifting/${currentIndex + 1}`);
        // currentSlide.querySelector('.mobile_slide_3d')?.classList.add('animate');
        // currentSlide.style.transform = 'rotateY(20deg)'; // Apply Y-axis rotation
    };

    // Add device orientation event listener
    React.useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            const { beta, gamma } = event; // beta is front-to-back tilt in degrees, gamma is left-to-right
            const activeSlide = document.querySelector('.swiper-slide-active .mobile_slide_3d');
            if (activeSlide) {
                const tiltX = gamma ? gamma / 20 : 0; // Adjusted division factor for smoother effect
                const tiltY = beta ? beta / 20 : 0;
                (activeSlide as HTMLElement).style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={0}
            scrollbar={{ draggable: true }}
            effect="coverflow"
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 500,
                modifier: 2,
                slideShadows: true,
            }}
            style={{ height: '100vh' }}
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
            speed={400}
            initialSlide={currentSlide <= projects.length ? currentSlide - 1 : 1}
        >
            {projects.map((project, index) => (
                <div key={index}>
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${project.mobileImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            }}
                            className='mobile_slide_3d w-full h-full'
                        >
                            <div className='flex flex-nowrap gap-5 items-end px-5 py-20 w-full h-full'>
                                <div className="content flex flex-grow flex-col gap-3 w-fit">
                                    <h2 className='text-4xl'>{project.title}</h2>
                                    <p className='text-base'>{project.description}</p>
                                </div>
                                <div className="flex flex-col gap-2 text-white text-[10px] items-center w-fit">
                                    <div className="current">{index + 1}</div>
                                    <span className='border-b-2 border-white w-2'></span>
                                    <div className="total">{projects.length}</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </div>
            ))}
        </Swiper>
    )
}

// Add CSS for animations and pagination
const styles = `

.mobile_slide_3d {
    transition: transform 0.5s ease-in-out;
}

.swiper-pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10;
}

.swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5); // Translucent white
    opacity: 1;
}

.swiper-pagination-bullet-active {
    background: red; // Red for active bullet
}

.swiper-slide {
    transition-timing-function: ease-in-out;
}
`

// Inject styles into the document
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default SwiperMobile