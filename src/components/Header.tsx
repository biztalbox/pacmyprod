"use client"
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="bg-gradient-to-b from-background to-transparent text-white py-4 opacity-70 fixed w-full z-50">
                <div className="container flex justify-between items-center">
                    <div className="text-white font-bold text-lg">
                        <img src="/logo.png" alt="PMP" className="h-14" />
                    </div>
                    {!isOpen ?
                        (
                            <FiMenu className='md:hidden text-white text-2xl' onClick={toggleMenu} />
                        ) : (
                            <IoMdClose className='md:hidden text-white text-2xl' onClick={toggleMenu} />
                        )}
                    <div className="hidden md:flex flex-nowrap gap-4">
                        <a href="/" className="">Home</a>
                        <a href="/about" className="">About</a>
                        <a href="/contact" className="">Contact</a>
                    </div>
                </div>
                {isOpen && (
                    <nav className="flex flex-col divide-y divide-gray-700 text-white">
                        <a href="/" className="text-white hover:bg-overlay py-4 px-5">Home</a>
                        <a href="/about" className="text-white hover:bg-overlay py-4 px-5">About</a>
                        <a href="/contact" className="text-white hover:bg-overlay py-4 px-5">Contact</a>
                    </nav>
                )}
            </header>

        </>
    )
}

export default Header