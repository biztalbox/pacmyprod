"use client"
import React, { useEffect, useState } from 'react';

const Counter = () => {
  const [clientsServed, setClientsServed] = useState(0);
  const [totalExperience, setTotalExperience] = useState(0);
  const [productsPacked, setProductsPacked] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);

  const countTo = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        setter(count);
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust the speed of the countdown here
  };

  useEffect(() => {
    countTo(setClientsServed, 90);
    countTo(setTotalExperience, 70);
    countTo(setProductsPacked, 80);
    countTo(setProjectsCompleted, 90);
  }, []);

  return (
    <section className='bg-gradient-to-t from-background to-transparent text-primary py-4 z-50 relative md:absolute bottom-0 w-full'>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-around">
        <div className="flex flex-col gap-1 items-center text-center">
          <span className='text-4xl font-bold'>{clientsServed}+</span>
          <h5 className='text-base md:text-lg'>Clients Served</h5>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <span className='text-4xl font-bold'>{totalExperience}+</span>
          <h5 className='text-base md:text-lg'>Total Experience</h5>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <span className='text-4xl font-bold'>{productsPacked}+</span>
          <h5 className='text-base md:text-lg'>Products Packed</h5>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <span className='text-4xl font-bold'>{projectsCompleted}+</span>
          <h5 className='text-base md:text-lg whitespace-nowrap'>Projects Completed</h5>
        </div>
      </div>
    </section>
  );
}

export default Counter;