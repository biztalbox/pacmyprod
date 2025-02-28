"use client"
import React from 'react';

const ContactPage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Form submitted');
        (e.target as HTMLFormElement).reset();
    }
    return (
        <main className='redish_section'>
            <section className="text-center py-16 px-6 text-foreground">
                <div className="container flex flex-col gap-8 text-center">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="mt-4">
                        If you have any questions, comments, or inquiries, please feel free to reach out to us. Our team is always ready to assist you with any information you need.
                    </p>
                </div>
            </section>
            <section className='pb-16 text-foreground'>
                <div className="container flex flex-col xl:flex-row md:justify-between items-center text-center md:text-start gap-10">
                    <img src="/contact.avif" alt="Contact Image" className='w-full md:w-1/2 rounded-lg' />
                    <div className="flex flex-col gap-8 w-full md:w-1/2">
                        <h3 className='font-bold'>Get in Touch with Us</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-foreground">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required className="p-2 border rounded text-background" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required className="p-2 border rounded text-background" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" name="message" required className="p-2 border rounded text-background"></textarea>
                            </div>
                            <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded hover:bg-accent transition w-fit m-auto md:m-0">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="py-16 text-foreground">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Call Card */}
                    <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col items-center gap-4">
                        <i className="w-12 h-12"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.29 22 2 13.71 2 3.5 2 2.95 2.45 2.5 3 2.5H6.5c.55 0 1 .45 1 1 0 1.25.24 2.46.69 3.58.14.34.07.73-.27 1.11l-2.2 2.2z" /></svg></i>
                        <h3 className="text-2xl font-bold">Call Us</h3>
                        <a href='tel:9818601834' className="text-lg">91 9818601834</a>
                    </div>
                    {/* Email Card */}
                    <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col items-center gap-4">
                        <i className="w-12 h-12"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 4l-7 4.5L5 8V6l7 4.5L19 6v2z" /></svg></i>
                        <h3 className="text-2xl font-bold">Email Us</h3>
                        <a href='mailto:pacmyproduct@gmail.com' className="text-lg">pacmyproduct@gmail.com</a>
                    </div>
                    {/* Location Card */}
                    <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col items-center gap-4">
                        <i className="w-12 h-12"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg></i>
                        <h3 className="text-2xl font-bold">Our Location</h3>
                        <p className="text-lg">Digital Greens, A-6-014, 6th Floor Tower A, Golf Course Extn. Road, Sector-61, Gugaon, Haryana-122102</p>
                    </div>
                </div>
            </section>

            <section className="text-foreground">
                <h3 className="text-3xl font-bold text-center mb-8">Find Us on Google Maps</h3>
                <div className="w-full h-96">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1840635414956!2d77.06920637450098!3d28.41370239398621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d226e24cfffff%3A0x91257ba7ca10ffce!2sPacmyproduct!5e0!3m2!1sen!2sin!4v1740738733797!5m2!1sen!2sin" className='w-full h-96' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </main>

    );
}

export default ContactPage;