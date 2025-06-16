"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import SwiperCore from "swiper";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { usePathname } from "next/navigation";
import Project from "@/types/projects";

// Initialize Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const SwiperMobile: React.FC<{
  currentSlide: number;
  projectData: Project[];
  onSlideChange?: (index: number) => void;
}> = ({ currentSlide, projectData, onSlideChange }) => {
  const pathname = usePathname();
  const projects: Project[] = projectData as Project[];

  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.activeIndex;
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  };

  // Add device orientation event listener
  // React.useEffect(() => {
  //     const handleOrientation = (event: DeviceOrientationEvent) => {
  //         const { beta, gamma } = event; // beta is front-to-back tilt in degrees, gamma is left-to-right
  //         const activeSlide = document.querySelector('.swiper-slide-active .mobile_slide_3d');
  //         if (activeSlide) {
  //             // Adjust the division factor for smoother effect
  //             const tiltX = gamma ? gamma / 10 : 0; // Adjusted for more sensitivity
  //             const tiltY = beta ? beta / 10 : 0;
  //             (activeSlide as HTMLElement).style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
  //         }
  //     };

  //     window.addEventListener('deviceorientation', handleOrientation, true);

  //     return () => {
  //         window.removeEventListener('deviceorientation', handleOrientation);
  //     };
  // }, []);

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
      style={{ height: "100vh" }}
      onSlideChangeTransitionEnd={handleSlideChange}
      pagination={{ clickable: true }}
      speed={400}
      initialSlide={currentSlide}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundImage: `url(${project.mobileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="mobile_slide_3d w-full h-full flex items-center justify-center"
          >
            <div className="flex flex-nowrap flex-row gap-5 items-end pb-20 px-5 w-full h-full">
              <div className="content flex flex-col gap-5 w-72 text-black">
                <h2 className="text-3xl text-stroke-2 text-stroke-black text-red-600">
                  {project.title}
                </h2>
                <p className="text-base text-stroke-1 text-stroke-gray-200">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-black text-[10px] items-center w-fit">
                <div className="current">{index + 1}</div>
                <span className="border-b-2 border-black w-2"></span>
                <div className="total">{projects.length}</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperMobile;
