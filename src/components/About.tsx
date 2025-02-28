import Link from 'next/link'
import React from 'react'

const About = () => {
    return (
        <section className='py-24 text-foreground'>

            <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                <img src="/about.webp" alt="About Image" className='w-96' />
                <div className="flex flex-col gap-8">
                    <h2>Expertly crafted, professionally presented</h2>
                    <p>We offer high-quality gifting and packaging solutions for every occasion. With over 15 years of experience and a team of highly skilled individuals, we treasure and preserve the traditional essence of gifting and packaging. </p>
                    <p>It is a certainty that every kit delivered by PMP has an extra personal touch that shows our top-notch skills along with the intention of our clients to make an everlasting impression on the receiver. Additionally, one of our key expertise is that we never compromise our quality.
                    </p>
                    <Link href='/about' className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                        Know More About Us
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default About