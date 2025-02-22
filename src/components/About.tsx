import React from 'react'

const About = () => {
    return (
        <section className='py-20 text-foreground'>

            <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                <img src="/about.png" alt="About Image" className='w-full rounded-full' />
                <div className="flex flex-col gap-8">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eaque possimus, officiis expedita asperiores at est molestiae sit harum corporis, repudiandae tempora natus! Tempore sit impedit qui aspernatur, laboriosam nulla!</p>
                    <button className=" px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                        Know More About Us
                    </button>
                </div>
            </div>
        </section>
    )
}

export default About