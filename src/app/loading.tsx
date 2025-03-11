"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Loading = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Minimum 1 second delay

        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    return (
        <section className="redish_section min-h-screen">
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
            </div>
        </section>
    )
}

export default Loading