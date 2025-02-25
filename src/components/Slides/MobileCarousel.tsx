"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import projectData from '@/app/data/projectData.json'; // Adjust the path as necessary
import MobileSlides from './MobileSlides'; // Adjust the path as necessary

const MobileCarousel = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let projects: THREE.Mesh[] = [];
    let currentProject: number = 0;
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
    }, []);

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);

        if (sectionRef.current) {
            sectionRef.current.appendChild(renderer.domElement);
        }

        camera.position.z = 35; // Mobile-specific camera position
        createProjects();

        // if (projects.length > 0) {
        //     transitionToProject(0);
        // } else {
        //     console.error("No projects available to display.");
        // }

        window.addEventListener('resize', onWindowResize);
        animate();
    };

    const createProjects = () => {
        projectData.forEach((project, index) => {
            const geometry = new THREE.PlaneGeometry(20, 15);
            const texture = new THREE.TextureLoader().load(project.mobileImage, () => {
                renderer.render(scene, camera);
            });
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
            const mesh = new THREE.Mesh(geometry, material);

            // For mobile, position vertically
            mesh.position.y = index * 25;

            scene.add(mesh);
            projects.push(mesh);
        });
    };

    const transitionToProject = (index: number) => {
        isTransitioning = true;
        gsap.to(camera.position, {
            y: projects[index].position.y,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                isTransitioning = false;
            }
        });

        projects.forEach((project, i) => {
            gsap.to(project.material, { opacity: (i === index) ? 1 : 0, duration: 0.5 });
        });
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    return (
        <div ref={sectionRef} id="canvas-container"
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                overflow: 'hidden',
                zIndex: 1000
            }}
        >
            {projectData.map((project, index) => (
                <MobileSlides
                    key={index}
                    image={project.mobileImage}
                    text={project.title}
                    index={index}
                    setIndex={(newIndex) => currentProject = newIndex}
                />
            ))}
        </div>
    );
}

export default MobileCarousel;