"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import projectData from '../../data/projectData.json'; // Adjusted the path

const MobileSlides = (
    { currentProject,
        image,
        text,
        description
    }:
        {
            currentProject: number,
            image: string,
            text: string,
            description: string
        }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initialize Three.js scene
        const scene = new THREE.Scene();

        // Set up camera with a more dramatic perspective for tilt effect
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 600;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create and load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(image);
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;


        const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        const material = new THREE.MeshBasicMaterial({
            map: texture
        });

        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;
        scene.add(mesh);

        // Add tilt animation
        const animate = () => {
            if (!mesh) return;

            // Calculate scroll position relative to viewport
            const rect = container.getBoundingClientRect();
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Apply tilt based on scroll position
            mesh.rotation.x = scrollProgress * 0.2;
            mesh.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.2;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        // animate();

        // Animate text overlay
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }

    }, [image]);

    return (
        <div ref={containerRef} className="relative w-screen h-screen overflow-hidden">
            <div
                ref={textRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           text-white text-4xl font-bold text-center z-10 pointer-events-none
                           mix-blend-difference"
            >
                {text}
            </div>
        </div>
    );
}

export default MobileSlides;