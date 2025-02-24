"use client"
import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const GalleryV2: React.FC = () => {
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
    { title: 'Portrait 1', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
    { title: 'Portrait 2', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
    { title: 'Portrait 3', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
    { title: 'Portrait 4', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' },
    { title: 'Portrait 5', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80' }
  ];

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
      sectionRef.current?.removeEventListener('mousemove', onMouseMove);
      sectionRef.current?.removeEventListener('wheel', onScroll);
      sectionRef.current?.removeEventListener('keydown', onKeyPress);
      sectionRef.current?.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
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

    camera.position.z = 30;
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
    sectionRef.current?.setAttribute('tabindex', '0');
    sectionRef.current?.addEventListener('keydown', onKeyPress);
    animate();

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    if (prevButton) {
      prevButton.addEventListener('click', handlePrev);
    }
    if (nextButton) {
      nextButton.addEventListener('click', handleNext);
    }
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
      createCaption(project.title, mesh);
    });
  };

  const createCaption = (title: string, mesh: THREE.Mesh) => {
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.innerText = title;
    if (sectionRef.current) {
      sectionRef.current.appendChild(caption);
    }
    mesh.userData.caption = caption;
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (isTransitioning || !isMouseInside) return;
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'd') {
      nextButton?.click();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'a') {
      prevButton?.click();
    }
  };

  const onScroll = (event: WheelEvent) => {
    if (isTransitioning || !isMouseInside) return;
    currentProject = (event.deltaY > 0) ? (currentProject + 1) % projects.length : (currentProject - 1 + projects.length) % projects.length;
    transitionToProject(currentProject);
  };

  const transitionToProject = (index: number) => {
    isTransitioning = true;
    gsap.to(camera.position, {
      x: projects[index].position.x,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        isTransitioning = false;
      }
    });
    projects.forEach((project, i) => {
      gsap.to(project.material, { opacity: (i === index) ? 1 : 0, duration: 1 });
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
    projects.forEach(project => {
      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(project.matrixWorld);
      vector.project(camera);
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;
      (project.userData.caption as HTMLElement).style.left = `${x}px`;
      (project.userData.caption as HTMLElement).style.top = `${y}px`;
    });
  };

  const handleNext = () => {
    if (!isTransitioning && projects.length > 0) {
      currentProject = (currentProject + 1) % projects.length;
      console.log(currentProject);
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
  };

  const onMouseUp = () => {
    isDragging = false;
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
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', onMouseMoveDrag);
      sectionRef.current.addEventListener('mouseup', onMouseUp);
      sectionRef.current.addEventListener('mouseleave', onMouseUp);
    }
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', onMouseMoveDrag);
        sectionRef.current.removeEventListener('mouseup', onMouseUp);
        sectionRef.current.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} id="canvas-container" style={{ height: '100vh', overflow: 'hidden' }}></div>
  );
}

export default GalleryV2;