"use client"
import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const PackagingGallery = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMouseInside, setIsMouseInside] = useState(false);
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let projects: THREE.Mesh[] = [];
    let currentProject = 0;
    let isTransitioning = false;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let isDragging = false;
    let dragStartX = 0;

    const projectsData = [
        { title: 'Portrait 1', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
        { title: 'Portrait 2', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
        { title: 'Portrait 3', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
        { title: 'Portrait 4', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
        { title: 'Portrait 5', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' }
    ];

    useEffect(() => {
        if (isOpen) {
            init();
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                requestGyroPermission();
            }
        }
        return () => {
            // Cleanup on component unmount
            if (renderer) {
                renderer.dispose();
                if (sectionRef.current) {
                    sectionRef.current.removeChild(renderer.domElement);
                }
            }
            // Remove event listeners
            window.removeEventListener('resize', onWindowResize);
            sectionRef.current?.removeEventListener('mousemove', onMouseMove);
            sectionRef.current?.removeEventListener('wheel', onScroll);
            sectionRef.current?.removeEventListener('keydown', onKeyPress);
            sectionRef.current?.removeEventListener('touchstart', onTouchStart);
            sectionRef.current?.removeEventListener('touchmove', onTouchMove);
            sectionRef.current?.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            // Cleanup event listeners
            const prevButton = document.getElementById('prev-button');
            const nextButton = document.getElementById('next-button');
            if (prevButton) {
                prevButton.removeEventListener('click', handlePrev);
            }
            if (nextButton) {
                nextButton.removeEventListener('click', handleNext);
            }
            sectionRef.current?.removeEventListener('touchstart', onTouchStart);
            sectionRef.current?.removeEventListener('touchmove', onTouchMove);
            sectionRef.current?.removeEventListener('touchend', onTouchEnd);
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                window.removeEventListener('deviceorientation', handleOrientation);
            }
        };
    }, [isOpen]);

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);

        if (sectionRef.current) {
            sectionRef.current.appendChild(renderer.domElement); // Append to the section
        }

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            camera.position.z = 28;
            createMobileProjects();
        } else {
            camera.position.z = 25;
            createProjects();
        }

        // Show the first project by default
        if (projects.length > 0) {
            transitionToProject(0); // Show the first project
        } else {
            console.error("No projects available to display.");
        }

        // Add event listeners scoped to the section
        sectionRef.current?.addEventListener('mousemove', onMouseMove);
        sectionRef.current?.addEventListener('mouseenter', () => setIsMouseInside(true));
        sectionRef.current?.addEventListener('mouseleave', () => setIsMouseInside(false));
        sectionRef.current?.addEventListener('mousedown', onMouseDown);
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('keydown', onKeyPress);
        animate();

        // Add event listeners for buttons
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        if (prevButton) {
            prevButton.addEventListener('click', handlePrev);
        }
        if (nextButton) {
            nextButton.addEventListener('click', handleNext);
        }

        sectionRef.current?.addEventListener('touchstart', onTouchStart);
        sectionRef.current?.addEventListener('touchmove', onTouchMove);
        sectionRef.current?.addEventListener('touchend', onTouchEnd);

        // Add click event listeners for the project meshes
        projects.forEach((project) => {
            project.userData.mesh.addEventListener('click', handleClick); // Change to next project on click
            project.userData.mesh.addEventListener('mouseenter', () => handleMouseEnter(project));
            project.userData.mesh.addEventListener('mouseleave', () => handleMouseLeave(project));
        });
    };

    const createMobileProjects = () => {
        projectsData.forEach((project, index) => {
            const geometry = new THREE.PlaneGeometry(10, 15);
            const texture = new THREE.TextureLoader().load(project.image, () => {
                renderer.render(scene, camera);
            });
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = -index * 20;
            scene.add(mesh);
            projects.push(mesh);
            mesh.userData = { mesh };
            createCaption(project.title, mesh);
        });
        console.log("Mobile projects created:", projects.length);
    };

    const createProjects = () => {
        projectsData.forEach((project, index) => {
            const geometry = new THREE.PlaneGeometry(20, 15);
            const texture = new THREE.TextureLoader().load(project.image, () => {
                renderer.render(scene, camera);
            });
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = index * 25;
            scene.add(mesh);
            projects.push(mesh);
            mesh.userData = { mesh };
            createCaption(project.title, mesh);
        });
        console.log("Desktop projects created:", projects.length);
    };

    const createCaption = (title: string, mesh: THREE.Mesh) => {
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.innerText = title;
        if (sectionRef.current) {
            sectionRef.current.appendChild(caption); // Append captions to the section
        }
        mesh.userData.caption = caption;
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
        // Remove tilt effect
        // ... existing code ...
    };

    const requestGyroPermission = async () => {
        const deviceOrientationEvent = DeviceOrientationEvent as any; // Use 'any' to bypass TypeScript error
        if (typeof deviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await deviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true); // Add device orientation listener
                } else {
                    console.warn("Device orientation permission denied.");
                }
            } catch (error) {
                console.error("Error requesting device orientation permission:", error);
            }
        } else {
            // Fallback for browsers that do not require permission
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    };

    const onKeyPress = (event: KeyboardEvent) => {
        if (isTransitioning || !isMouseInside) return; // Check if mouse is inside
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'd') {
            nextButton?.click(); // Simulate click on the next button
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'a') {
            prevButton?.click(); // Simulate click on the previous button
        }
    };

    const onScroll = (event: WheelEvent) => {
        if (isTransitioning || !isMouseInside) return; // Check if mouse is inside
        currentProject = (event.deltaY > 0) ? (currentProject + 1) % projects.length : (currentProject - 1 + projects.length) % projects.length;
        transitionToProject(currentProject);
    };

    const transitionToProject = (index: number) => {
        // Ensure the index is valid and projects are available
        if (index < 0 || index >= projects.length || projects.length === 0) {
            console.error(`Invalid project index: ${index} or no projects available.`);
            return; // Exit if the index is invalid or no projects
        }

        console.log(`Transitioning to project index: ${index}`); // Debug log
        isTransitioning = true;
        const targetPosition = /Mobi|Android/i.test(navigator.userAgent) ? projects[index].position.y : projects[index].position.x;

        gsap.to(camera.position, {
            [/Mobi|Android/i.test(navigator.userAgent) ? 'y' : 'x']: targetPosition,
            duration: 0.8, // Reduced duration for slightly faster transition
            ease: "power3.inOut", // Easing function remains the same
            onComplete: () => {
                isTransitioning = false;
                console.log(`Transition complete to project index: ${index}`); // Debug log
            }
        });

        projects.forEach((project, i) => {
            if (i === index) {
                gsap.to(project.material, { opacity: 1, duration: 1.2, ease: "power3.inOut" }); // Smooth opacity transition
            } else {
                gsap.to(project.material, { opacity: 0, duration: 1.2, ease: "power3.inOut" }); // Smooth opacity transition
            }
        });
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
        if (isDragging) {
            const dragDistance = event.clientX - dragStartX;
            if (dragDistance < -50) { // Drag left (now goes to next)
                handleNext();
                dragStartX = event.clientX; // Reset start position
            } else if (dragDistance > 50) { // Drag right (now goes to previous)
                handlePrev();
                dragStartX = event.clientX; // Reset start position
            }
        }
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
    };

    const onMouseLeave = (event: MouseEvent) => {
        // Removed mouse leave scaling effect
    };
    const handleClick = (event: MouseEvent) => {
        const mesh = event.target as unknown as THREE.Mesh; // Cast to unknown first to avoid type error
        if (mesh && mesh.userData && mesh.userData.mesh) {
            handleNext(); // Navigate to the next project on click
        }
    };

    const onTouchStart = (e: TouchEvent) => {
        isDragging = true;
        dragStartX = e.touches[0].clientX; // Get the initial touch position
    };

    const onTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            const dragDistance = e.touches[0].clientX - dragStartX;
            if (dragDistance > 50) { // Drag right
                handlePrev(); // Navigate to the previous project
                isDragging = false; // Reset dragging state
            } else if (dragDistance < -50) { // Drag left
                handleNext(); // Navigate to the next project
                isDragging = false; // Reset dragging state
            }
        }
    };

    const onTouchEnd = () => {
        isDragging = false; // Reset dragging state
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        projects.forEach(project => {
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(project.matrixWorld);
            vector.project(camera);
            const x = (vector.x * .5 + .5) * window.innerWidth;
            const y = (-(vector.y * .5) + .5) * window.innerHeight;
            project.userData.caption.style.left = `${x}px`;
            project.userData.caption.style.top = `${y}px`;
        });
    };

    const handleNext = () => {
        if (!isTransitioning && projects.length > 0) {
            currentProject = (currentProject + 1) % projects.length;
            console.log(`Navigating to next project: ${currentProject}`);
            transitionToProject(currentProject);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning && projects.length > 0) {
            currentProject = (currentProject - 1 + projects.length) % projects.length;
            console.log(`Navigating to previous project: ${currentProject}`);
            transitionToProject(currentProject);
        }
    };

    const onMouseDown = (event: MouseEvent) => {
        isDragging = true;
        dragStartX = event.clientX;
    };

    const onMouseUp = () => {
        isDragging = false;
    };

    const handleMouseEnter = (project: THREE.Mesh) => {
        gsap.to(project.rotation, {
            x: -0.1, // Tilt down
            y: 0.1,  // Tilt right
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (project: THREE.Mesh) => {
        gsap.to(project.rotation, {
            x: 0,    // Reset tilt
            y: 0,    // Reset tilt
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        isOpen && ( // Render only if the gallery is open
            <section
                ref={sectionRef}
                id="canvas-container"
                style={{
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Optional: semi-transparent background
                    overflow: 'hidden',
                    zIndex: 1000 // Ensure it is on top of other elements
                }}
                tabIndex={0}
                onFocus={() => setIsMouseInside(true)}
                onBlur={() => setIsMouseInside(false)}
                onKeyDown={(event) => onKeyPress(event as unknown as KeyboardEvent)}
            >
                <button
                    onClick={onClose} // Close button functionality
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px',
                        cursor: 'pointer',
                        zIndex: 1001 // Ensure it is above the canvas
                    }}
                >
                    Close
                </button>
                <button id="prev-button" style={buttonStyle('left')}>◀</button>
                <button id="next-button" style={buttonStyle('right')}>▶</button>
            </section>
        )
    );
};

const buttonStyle = (position: 'left' | 'right'): CSSProperties => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [position]: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1000,
});

export default PackagingGallery;