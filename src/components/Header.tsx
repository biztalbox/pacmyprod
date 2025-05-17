"use client"
import Link from 'next/link';
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
            <header className="bg-gradient-to-b from-background to-transparent text-white py-4 fixed w-full z-50">
                <div className="container flex justify-between items-center">
                    <Link href='/' className="text-white font-bold text-lg">
                        <img src="/logo.png" alt="PMP" className="h-14" />
                    </Link>
                    {!isOpen ?
                        (
                            <FiMenu className='text-white text-2xl cursor-pointer' onClick={toggleMenu} />
                        ) : (
                            <IoMdClose className='text-white text-2xl cursor-pointer' onClick={toggleMenu} />
                        )}
                    {/* <div className="hidden md:flex flex-nowrap gap-4">
                        <Link href="/" className="">Home</Link>
                        <Link href="/about" className="">About</Link>
                        <Link href="/contact" className="">Contact</Link>
                    </div> */}
                </div>
                {isOpen && (
                    <nav className="flex flex-col divide-y divide-devider text-white container bg-gradient-to-b from-background to-transparent">
                        <Link href="/" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>Home</Link>
                        <Link href="/about" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>About</Link>
                        <Link href="/packaging" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>Packaging</Link>
                        <Link href="/gifting" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>Gifting</Link>
                        <Link href="/blog" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>Blog</Link>
                        <Link href="/contact" className="text-gray-400 hover:bg-overlay hover:text-white py-4 px-5" onClick={toggleMenu}>Contact</Link>
                    </nav>
                )}
            </header>

        </>
    )
}

export default Header