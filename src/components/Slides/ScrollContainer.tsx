"use client"
import React from 'react';
import MobileCarousel from './MobileCarousel';
import projectData from '../../data/projectData.json';
const ScrollContainer = ({ currentProject }: { currentProject: number }) => {
    return (
        <div 
            className="w-full relative"
            style={{ 
                height: `${100 * projectData.length}vh`,
                pointerEvents: 'none'
            }}
        >
            <MobileCarousel currentProject={currentProject} />
        </div>
    );
};

export default ScrollContainer; 