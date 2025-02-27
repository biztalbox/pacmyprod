"use client"
import React, { useEffect, useRef } from 'react';
import projectData from '../../data/projectData.json';
import MobileSlides from './MobileSlides';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MobileCarousel = ({ currentProject }: { currentProject: number }) => {
    const containerRef = useRef<HTMLElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Scroll to current project
        const targetSlide = slidesRef.current[currentProject];
        if (targetSlide) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSlide,
                    autoKill: false
                },
                ease: "power2.inOut"
            });
        }

        // Set up scroll triggers for each slide
        slidesRef.current.forEach((slide, index) => {
            if (!slide) return;

            gsap.fromTo(slide,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: slide,
                        start: "top center",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                        markers: false
                    }
                }
            );
        });

        // Smooth scroll setup
        const smoothScroll = () => {
            let currentScroll = window.pageYOffset;
            let targetScroll = currentScroll;
            let ease = 0.075; // Adjust this value to change scroll smoothness

            const animate = () => {
                currentScroll = lerp(currentScroll, targetScroll, ease);
                if (containerRef.current) {
                    containerRef.current.style.transform = `translateY(${-currentScroll}px)`;
                }
                requestAnimationFrame(animate);
            };

            animate();

            window.addEventListener('scroll', () => {
                targetScroll = window.pageYOffset;
            });
        };

        smoothScroll();

        return () => {
            // Cleanup scroll triggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [currentProject]);

    // Linear interpolation helper function
    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    };

    return (
        <section 
            ref={containerRef}
            className='fixed top-0 w-full'
            style={{ willChange: 'transform' }}
        >
            {projectData.map((project, index) => (
                <div 
                    key={index} 
                    ref={el => {
                        if (el) {
                            slidesRef.current[index] = el;
                        }
                    }}
                    className="h-screen w-full"
                    style={{ 
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <MobileSlides 
                        currentProject={index} 
                        image={project.mobileImage} 
                        text={project.title} 
                        description={project.description} 
                    />
                </div>
            ))}
        </section>
    );
};

export default MobileCarousel;