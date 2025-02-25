"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const MobileSlides = ({ image, text, index, setIndex }:
    { image: string, text: string, index: number, setIndex: (index: number) => void }) => {

    const sectionRef = useRef<HTMLDivElement>(null);
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let slides: THREE.Mesh[] = [];
    let isTransitioning: boolean = false;

    useEffect(() => {
        init();
        return () => {
            if (renderer) {
                renderer.dispose();
                if (sectionRef.current) {
                    sectionRef.current.removeChild(renderer.domElement);
                }
            }
            window.removeEventListener('resize', onWindowResize);
        };
    }, [image, text]);

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        
        // Adjust renderer size for mobile devices
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Ensure high resolution on mobile

        renderer.setClearColor(0x000000);

        if (sectionRef.current) {
            sectionRef.current.appendChild(renderer.domElement);
        }

        camera.position.z = 30;
        createSlides();

        if (slides.length > 0) {
            transitionToSlide(index);
        }

        window.addEventListener('resize', onWindowResize);
        animate();
    };

    const createSlides = () => {
        const geometry = new THREE.PlaneGeometry(20, 15);
        const texture = new THREE.TextureLoader().load(image);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(geometry, material);

        // Position slide based on index
        mesh.position.y = index * 25;

        // Set initial opacity based on index
        material.opacity = (index === 0) ? 1 : 0;

        scene.add(mesh);
        slides.push(mesh);
    };

    const transitionToSlide = (index: number) => {
        if (index < 0 || index >= slides.length) {
            console.error(`Invalid slide index: ${index}`);
            return;
        }

        isTransitioning = true;
        gsap.to(camera.position, {
            y: slides[index].position.y,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                isTransitioning = false;
            }
        });

        slides.forEach((slide, i) => {
            gsap.to(slide.material, { opacity: (i === index) ? 1 : 0, duration: 0.5 });
        });
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Update pixel ratio on resize
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    return (
        <div ref={sectionRef} style={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden'
        }}>
            {/* Add any additional UI elements here */}
        </div>
    );
};

export default MobileSlides;