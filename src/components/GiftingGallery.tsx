"use client"
import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const GiftingGallery = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMouseInside, setIsMouseInside] = useState(false);
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let projects: THREE.Mesh[] = [];
    const [currentProject, setCurrentProject] = useState(0);
    let isTransitioning = false;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let isDragging = false;
    let dragStartX = 0;
    const [isMounted, setIsMounted] = useState(false);

    const projectsData = [
        { title: 'Portrait 1', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 2', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 3', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 4', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' }
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && isMounted) {
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
    }, [isOpen, isMounted]);

    useEffect(() => {
        if (isMounted && projects.length > 0) {
            transitionToProject(0);
        }
    }, [projects, isMounted]);

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);

        if (sectionRef.current) {
            sectionRef.current.appendChild(renderer.domElement); 
        }

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            camera.position.z = 20;
            createMobileProjects();
        } else {
            camera.position.z = 12;
            createProjects().then(() => {
                // Show the first project by default after projects are created
                if (projects.length > 0) {
                    transitionToProject(0); // Display the first project
                } else {
                    console.error("No projects available to display."); 
                }
            });
        }

        // Debugging logs
        console.log("Projects created:", projects.length); // Log the number of projects created

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
            const texture = new THREE.TextureLoader().load(project.mobileImage, () => {
                renderer.render(scene, camera);
            });
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = -index * 20;
            scene.add(mesh);
            projects.push(mesh);
            createCaption(project.title, mesh);
            
            // Add mouse move effect
            mesh.userData = { mesh }; // Store mesh reference
        });
        console.log("Mobile projects created:", projects.length);
        
        // Set the first project active by default
        if (projects.length > 0) {
            gsap.to(projects[0].material, { opacity: 1, duration: 1.2, ease: "power3.inOut" });
            transitionToProject(1); // Transition to the first project
        }
    };

    const createProjects = () => {
        return new Promise<void>((resolve) => {
            let loadedCount = 0; // Track loaded textures
            projectsData.forEach((project, index) => {
                const image = new Image();
                image.src = project.image; // Load the image to get its dimensions
                image.onload = () => {
                    const geometry = new THREE.PlaneGeometry(image.width / 100, image.height / 100); // Use original dimensions (scaled down)
                    const texture = new THREE.TextureLoader().load(project.image, () => {
                        loadedCount++; // Increment loaded count
                        renderer.render(scene, camera);
                        if (loadedCount === projectsData.length) {
                            resolve(); // Resolve the promise when all projects are loaded
                        }
                    });
                    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.position.x = index * (image.width / 100 + 5); // Adjust position based on image width
                    scene.add(mesh);
                    projects.push(mesh);
                    createCaption(project.title, mesh);
                    
                    // Add mouse move effect
                    mesh.userData = { mesh }; // Store mesh reference
                };
            });
        });
    };

    const createCaption = (title: string, mesh: THREE.Mesh) => {
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.innerText = title;
        if (sectionRef.current) {
            sectionRef.current.appendChild(caption); // Append captions to the section
        }
        mesh.userData.caption = caption; // Store caption reference in userData
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
        const newProject = (event.deltaY > 0) ? (currentProject - 1 + projects.length) % projects.length : (currentProject + 1) % projects.length;
        setCurrentProject(newProject); // Use setCurrentProject to update the state
        transitionToProject(newProject);
    };

    const transitionToProject = (index: number) => {
        // Ensure the index is valid and projects are available
        // if (index < 0 || index >= projects.length || projects.length === 0) {
        //     console.error(`Invalid project index: ${index} or no projects available.`);
        //     return; // Exit if the index is invalid or no projects
        // }

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
            if (dragDistance < -50) { // Drag left (now goes to previous)
                handlePrev();
                dragStartX = event.clientX; // Reset start position
            } else if (dragDistance > 50) { // Drag right (now goes to next)
                handleNext();
                dragStartX = event.clientX; // Reset start position
            }
        }
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        // Scale effect on hover
        if (intersects.length > 0) {
            const mesh = intersects[0].object as THREE.Mesh;
            gsap.to(mesh.rotation, { x: mouse.y * 0.5, y: mouse.x * 0.5, duration: 0.3 }); // Rotation effect
            gsap.to(mesh.position, { z: 0.5, duration: 0.3 }); // Position effect
        } else {
            // Reset scale for all projects when not hovering
            projects.forEach(project => {
                gsap.to(project.scale, { x: 1, y: 1, duration: 0.3 });
            });
        }
    };

    const handleClick = (event: MouseEvent) => {
        const mesh = event.target as unknown as THREE.Mesh; // Cast to unknown first to avoid type error
        if (mesh && mesh.userData && mesh.userData.mesh) {
            handleMouseEnter(mesh); // Apply tilt effect on click
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
            if (dragDistance < -50) { // Drag left (now goes to previous)
                handlePrev(); // Navigate to the previous project
                isDragging = false; // Reset dragging state
            } else if (dragDistance > 50) { // Drag right (now goes to next)
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
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

            // Ensure the caption exists before trying to access its style
            if (project.userData.caption) {
                project.userData.caption.style.left = `${x}px`;
                project.userData.caption.style.top = `${y}px`;
            }
        });
    };

    const handleNext = () => {
        if (!isTransitioning && projects.length > 0) {
            const nextProject = (currentProject + 1) % projects.length;
            setCurrentProject(nextProject);
            transitionToProject(nextProject);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning && projects.length > 0) {
            const prevProject = (currentProject - 1 + projects.length) % projects.length;
            setCurrentProject(prevProject);
            transitionToProject(prevProject);
        }
    };

    const onMouseDown = (event: MouseEvent) => {
        isDragging = true;
        dragStartX = event.clientX;
    };

    const onMouseUp = () => {
        isDragging = false;
    };

    const handleMouseEnter = (image: THREE.Mesh) => {
        gsap.to(image.rotation, {
            x: Math.PI / 6, // 30 degrees tilt down
            y: Math.PI / 6, // 30 degrees tilt right
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (image: THREE.Mesh) => {
        gsap.to(image.rotation, {
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

export default GiftingGallery;