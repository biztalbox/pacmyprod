import Link from 'next/link'
import React from 'react'

const About = () => {
    return (
        <section className='py-24 text-foreground'>

            <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                <img src="/about.webp" alt="About Image" className='w-96' />
                <div className="flex flex-col gap-8">
                    <h2>About Us</h2>
                    <p>Pac My Product is one of India's best gifting and packaging solutions company that strives to fulfill our customers’ versatile needs. With over 15 years of industry experience and a talented team, we strive to preserve the traditional essence of products wrapped with care and precision. </p>
                    <p>Every kit we deliver is imbued with a personal touch, ensuring every unwrapping is nothing less than a delightful experience. Good packaging is the first interaction between a brand and its client. Our craftsmanship ensures that quality is never an afterthought.</p>
                    <Link href='/about' className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                        Know More About Us
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default About