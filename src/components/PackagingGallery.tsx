"use client"
import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const PackagingGallery = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) =>  {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMouseInside, setIsMouseInside] = useState<boolean>(false);
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let projects: THREE.Mesh[] = [];
    let currentProject: number = 0;
    let isTransitioning: boolean = false;
    let raycaster: THREE.Raycaster = new THREE.Raycaster();
    let mouse: THREE.Vector2 = new THREE.Vector2();
    let isDragging: boolean = false;
    let dragStartX: number = 0;

    const projectsData = [
        { title: 'Portrait 1', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 2', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 3', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 4', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 5', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 6', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 7', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 8', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 9', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 10', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 11', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' },
        { title: 'Portrait 12', image: '/md_slide.jfif', mobileImage: '/portrait.jfif' }
    ];

    useEffect(() => {
        if (isOpen) {
            init();
        }
        return () => {
            if (renderer) {
                renderer.dispose();
                if (sectionRef.current) {
                    sectionRef.current.removeChild(renderer.domElement);
                }
            }
            window.removeEventListener('resize', onWindowResize);
            sectionRef.current?.removeEventListener('mousemove', onMouseMove);
            sectionRef.current?.removeEventListener('wheel', onScroll);
            sectionRef.current?.removeEventListener('keydown', onKeyPress);
            sectionRef.current?.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isOpen]);

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);

        if (sectionRef.current) {
            sectionRef.current.appendChild(renderer.domElement);
        }

        camera.position.z = window.innerWidth < 768 ? 35 : 15;
        createProjects();

        if (projects.length > 0) {
            transitionToProject(0);
        } else {
            console.error("No projects available to display.");
        }

        sectionRef.current?.addEventListener('mousemove', onMouseMove);
        sectionRef.current?.addEventListener('mouseenter', () => setIsMouseInside(true));
        sectionRef.current?.addEventListener('mouseleave', () => setIsMouseInside(false));
        sectionRef.current?.addEventListener('mousedown', onMouseDown);
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mouseup', onMouseUp);
        sectionRef.current?.setAttribute('tabindex', '0'); // Make the section focusable
        sectionRef.current?.addEventListener('keydown', onKeyPress);
        animate();
    };

    const createProjects = () => {
        projectsData.forEach((project, index) => {
            const geometry = new THREE.PlaneGeometry(20, 15);
            const texture = new THREE.TextureLoader().load(window.innerWidth < 768 ? project.mobileImage : project.image, () => {
                renderer.render(scene, camera);
            });
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
            const mesh = new THREE.Mesh(geometry, material);

            if (window.innerWidth < 768) {
                // For mobile, position vertically
                mesh.position.y = index * 25;
            } else {
                // For desktop, position horizontally
                mesh.position.x = index * 25;
            }

            scene.add(mesh);
            projects.push(mesh);
        });
    };

    const onKeyPress = (event: KeyboardEvent) => {
        if (isTransitioning) return;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'd') {
            handleNext();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'a') {
            handlePrev();
        }
    };

    const onScroll = (event: WheelEvent) => {
        if (isTransitioning || !isMouseInside) return;
        currentProject = (event.deltaY > 0) ? (currentProject + 1) % projects.length : (currentProject - 1 + projects.length) % projects.length;
        transitionToProject(currentProject);
    };

    const transitionToProject = (index: number) => {
        isTransitioning = true;
        if (window.innerWidth < 768) {
            // For mobile, transition vertically
            gsap.to(camera.position, {
                y: projects[index].position.y,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    isTransitioning = false;
                }
            });
        } else {
            // For desktop, transition horizontally
            gsap.to(camera.position, {
                x: projects[index].position.x,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    isTransitioning = false;
                }
            });
        }

        projects.forEach((project, i) => {
            gsap.to(project.material, { opacity: (i === index) ? 1 : 0, duration: 0.5 });
        });
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const mesh = intersects[0].object as THREE.Mesh;
            gsap.to(mesh.rotation, { x: mouse.y * 0.5, y: mouse.x * 0.5, duration: 0.3 });
            gsap.to(mesh.position, { z: 0.5, duration: 0.3 });
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    const handleNext = () => {
        if (!isTransitioning && projects.length > 0) {
            currentProject = (currentProject + 1) % projects.length;
            transitionToProject(currentProject);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning && projects.length > 0) {
            currentProject = (currentProject - 1 + projects.length) % projects.length;
            transitionToProject(currentProject);
        }
    };

    const onMouseDown = (event: MouseEvent) => {
        isDragging = true;
        dragStartX = event.clientX;
        sectionRef.current?.addEventListener('mousemove', onMouseMoveDrag);
    };

    const onMouseUp = () => {
        isDragging = false;
        sectionRef.current?.removeEventListener('mousemove', onMouseMoveDrag);
    };

    const onMouseMoveDrag = (event: MouseEvent) => {
        if (isDragging) {
            const dragDistance = event.clientX - dragStartX;
            if (dragDistance < -50) {
                handleNext();
                dragStartX = event.clientX;
            } else if (dragDistance > 50) {
                handlePrev();
                dragStartX = event.clientX;
            }
        }
    };

    useEffect(() => {
        document.body.style.overflowX = 'hidden'; // Hide horizontal overflow
        if (sectionRef.current) {
            sectionRef.current.addEventListener('mousemove', onMouseMoveDrag);
            sectionRef.current.addEventListener('mouseup', onMouseUp);
            sectionRef.current.addEventListener('mouseleave', onMouseUp);
        }
        return () => {
            document.body.style.overflowX = ''; // Reset to default on cleanup
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', onMouseMoveDrag);
                sectionRef.current.removeEventListener('mouseup', onMouseUp);
                sectionRef.current.removeEventListener('mouseleave', onMouseUp);
            }
        };
    }, []);

    function handleSwipe(direction: string) {
        if (direction === 'down') {
            // Navigate to the next slide (swipe down)
            handleNext();
        } else if (direction === 'up') {
            // Navigate to the previous slide (swipe up)
            handlePrev();
        }
    }

    // Add event listeners for touch events
    let touchStartY = 0;

    // Check if the device is mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        document.addEventListener('touchstart', function (event) {
            touchStartY = event.touches[0].clientY;
        });

        document.addEventListener('touchmove', function (event) {
            const touchEndY = event.touches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;

            if (swipeDistance > 50) {
                handleSwipe('up'); // Swipe up detected
            } else if (swipeDistance < -50) {
                handleSwipe('down'); // Swipe down detected
            }
        });
    }

    return (
        isOpen && (
            <div ref={sectionRef} id="canvas-container"
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
            </div>
        )
    );
}

export default PackagingGallery;