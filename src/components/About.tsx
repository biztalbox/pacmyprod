import Link from 'next/link'
import React from 'react'

const About = () => {
    return (
        <>
            <section className='py-16 text-foreground'>

                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                    <img src="/packing.webp" alt="About Image" className='w-96' />
                    <div className="flex flex-col gap-8">
                        <h2>Comprehensive Branded Packaging Solutions for Every Industry</h2>
                        <p>Pac My Product specializes in branded packaging services targeted to a variety of businesses. Whether you are in cosmetics, electronics,
                            or pharmaceuticals, our unique packaging solutions help your products stand out while being safe.
                            We provide high-quality cosmetic boxes packaging and <a href='https://www.pacmyproduct.com/kappa/perfume-boxes'>perfume boxes</a> that reflects luxury and company identity.
                        </p>
                        <p>Our strong electronics packaging boxes are ideal for tech firms because they&apos;re both safe and visually appealing. Automotive packing box solutions are
                            designed to handle heavy components with precision. In the F&B industry, we design eye-catching <a href='https://www.pacmyproduct.com/kappa/liquor-boxes'>liquor box</a> packaging to increase consumer appeal.
                            Healthcare brands depend on our pharmaceutical packaging solutions for quality and safety.
                        </p>
                        <p>
                            Our aim is to deliver packaging that not only serves a purpose but also captures the uniqueness of your brand.
                            Join together with us to create premium packaging services that inspire confidence and trust in all sectors.
                        </p>
                        <Link href='/packaging' className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                            Know More About Us
                        </Link>
                    </div>
                </div>
            </section>
            <section className='py-10 text-foreground bg-secondary'>

                <div className="container flex flex-col md:flex-row-reverse md:justify-between items-center text-center md:text-start gap-10 md:gap-16 " >
                    <img src="/gifting.webp" alt="About Image" className='w-96' />
                    <div className="flex flex-col gap-8 ">
                        <h2>Corporate Gifting Solutions: From Employee Kits to Executive Hampers </h2>
                        <p>
                            Corporate gifting isn&apos;t just about giving presents—it&apos;s a smart way to build your brand.
                            Whether it&apos;s <a href='https://www.pacmyproduct.com/gifting/corporate-gifting'>luxury corporate </a>gifting for top clients or joining kit gifting for new employees, the right gift
                            shows you care and leaves a lasting impression. Today, many corporate gifting companies offer beautifully designed
                            Employee Joining Kit Gifts that reflect your company&apos;s culture and values. These gifts are perfect for welcoming
                            new hires, celebrating festivals, or thanking loyal clients. With custom event gift boxes filled with premium items and thoughtful packaging,
                            businesses can make every occasion special. It&apos;s a great way to build relationships,
                            boost team morale, and create moments people remember.
                        </p>

                        <Link href='/gifting' className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                            View More 
                        </Link>
                    </div>
                </div>
            </section>
            <section className='py-10 text-foreground'>

                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                    <img src="/about.webp" alt="About Image" className='w-96' />
                    <div className="flex flex-col gap-8">
                        <h2>Expertly crafted, professionally presented</h2>
                        <p>We offer high-quality gifting and packaging solutions for every occasion. With over 15 years of experience and a team of highly skilled individuals, we treasure and preserve the traditional essence of gifting and packaging. </p>
                        <p>It is a certainty that every kit delivered by PMP has an extra personal touch that shows our top-notch skills along with the intention of our clients to make an everlasting impression on the receiver. Additionally, one of our key expertise is that we never compromise our quality.</p>
                        <Link href='/about' className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                            View More 
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About