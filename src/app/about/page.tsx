
const About = () => {
    return (
        <main>
            {/* Hero Section */}
            <section className="text-center py-16 px-6 bg-foreground">
                <h1 className="text-4xl font-bold text-primary">About Us</h1>
                <p className="mt-4 text-black max-w-2xl mx-auto">
                    We are dedicated to delivering top-notch solutions with a passion for technology and innovation.
                </p>
            </section>

            {/* Who we are */}
            <section className='py-16 text-foreground bg-secondary'>

                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                    <img src="/who_are_we.webp" alt="About Image" className='w-fit rounded-lg' />
                    <div className="flex flex-col gap-8">
                        <h2>Expertly crafted, professionally presented</h2>
                        <p>We offer high-quality gifting and packaging solutions for every occasion. With over 15 years of experience and a team of highly skilled individuals, we treasure and preserve the traditional essence of gifting and packaging.</p>
                        <p>It is a certainty that every kit delivered by PMP has an extra personal touch that shows our top-notch skills along with the intention of our clients to make an everlasting impression on the receiver. Additionally, one of our key expertise is that we never compromise our quality.</p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className='py-16 text-foreground'>
                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >

                    <div className="flex flex-col gap-8">
                        <h2>Why Choose Us?</h2>
                        <p>At Pac My Product, we recognize the significance of gifting and the art of packaging presentation. This fundamental principle drives our commitment to crafting exceptional gifting kits and packaging that elevate your brand's identity and create lasting, unforgettable experience.</p>
                    </div>
                    <img src="/why_choose_us.webp" alt="About Image" className='w-fit md:w-1/2 rounded-lg' />
                </div>
            </section>

            {/* Our Mission */}
            <section className='py-16 text-foreground bg-secondary'>

                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
                    <img src="/vision_mission.webp" alt="About Image" className='w-fit rounded-lg' />
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">

                            <h2>Our Mission & Vision</h2>
                            <p>We strive to provide innovative gifting kits and high-quality packaging solutions that meet customer needs. While catering to it, we prioritize sustainability and delivering exceptional service. Our core aim is not just to be your trusted partner but also to be an inseparable extended team. </p>
                            <p>We aim to be the only choice in the gifting and packaging industry.</p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Our Infrastructure */}
            <section className='py-16 text-foreground'>
                <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >

                    <div className="flex flex-col">
                        <h2 className="text-center">Our Infrastructure</h2>
                        <img src="/infra.webp" alt="our infrastructure" className="rounded-lg" />

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col gap-3">
                                <h3 className="">Pre Press</h3>
                                <ul className="list-disc list-inside pl-4">
                                    <li>MAC PRO WORKS STATION</li>
                                    <li>Other Work Station - PC Based (DELL)</li>
                                    <li>CP from Dainippon Screen (Model PTR 8600S)</li>
                                    <li>EPSON Stylus (Model 9800 Series)</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col gap-3">
                                <h3 className="">Pre Press</h3>

                                <div className="flex flex-col gap-3">
                                    <b>Cutting Machine</b>
                                    <ul className="list-disc list-inside pl-4">
                                        <li>Polar Automatic 36″</li>
                                        <li>Polar Automatic 42″</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <b>Offset Printing Machine</b>
                                    <ul className="list-disc list-inside pl-4">
                                        <li>Heidelberg MOV (5 Color + Coater)</li>
                                        <li>Size: 19×26</li>
                                        <li>Heidelberg SM 74 (6 Color + Coater)</li>
                                        <li>Size: 20″ x 29″ (With UV Lamps)</li>
                                        <li>Heidelberg CD 102 (6 Color + Coater)</li>
                                        <li>Size: 28″ x 40″ (With UV Lamps)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="p-6 bg-secondary rounded-lg shadow-md flex flex-col gap-3">
                                <h3 className="">Post Press</h3>
                                <ul className="list-disc list-inside pl-4">
                                    <li>Thermal Lamination – 26″ – 1 Pcs</li>
                                    <li>Thermal Lamination – 32″ – 1 Pcs</li>
                                    <li>Normal Lamination – 32″ – 1 Pcs</li>
                                    <li>Spot – UV Machine</li>
                                    <li>Leafing / Embossing Machine</li>
                                    <li>Samrat – Die Cutting – 25″ x 36″ – 2 Pcs</li>
                                    <li>Samrat – Die Cutting – 32″ x 43″ – 1 Pcs</li>
                                    <li>Aditya Dabbi Pasting – 2 Pcs</li>
                                    <li>Stall Round Feeder – Folding Machine – 25”x36” & 30″ x 40″</li>
                                    <li>Saddle Stitch Lines – Muller Martini – 335</li>
                                    <li>Automatic Book Sewing Machine – Muller Martini Ventura Inventa Plus (Max Size: 320 x 385mm)</li>
                                    <li>Case Maker – Kolbus DA 240 (Chrome) (Max Size: 660 x 405 mm)</li>
                                    <li>Calendar Fabrication – Renz online Wiro Machine AS – 500</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
};

export default About;
