import HeroPackaging from '@/components/HeroPackaging'
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: " Mono and Kappa Boxes Packaging in India | Custom and Durable",
  description: "Explore high-quality mono and kappa box packaging in India. Ideal for FMCG, cosmetics, pharma and gifting. Custom sizes, strong build and premium prints.",
};

const page = () => {
  return (<>
    <HeroPackaging />
    <section className='py-16 text-foreground'>
        
      <div className="container flex flex-col md:flex-row md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
        <img src="/packing.webp" alt="About Image" className='w-96' />
        <div className="flex flex-col gap-8">
          <h2>Mono Carton and Kappa Board Boxes in India – Pac My Product</h2>
          <p>
            At Pac My Product, we make strong and good-looking boxes like Mono Carton boxes and Kappa board boxes for many types of businesses in India. Our packaging helps protect your products and makes them look great too.
          </p>
          <h3>Mono Carton Boxes for Your Products</h3>
          <p>
            Mono Carton boxes are perfect for packing items like cosmetics, food, medicines, and electronics. These boxes are lightweight and easy to print on.  As trusted Mono Carton box manufacturers in India, we offer customized Mono Carton boxes to match your brand style.
          </p>
          <p>
            You can also buy <a href='https://www.pacmyproduct.com/mono/perfume-boxes'>Mono Carton boxes online in India</a> from Pac My Product. We provide both small and bulk orders and offer great prices for wholesale Mono Carton boxes in India. Our team can help you with Mono Carton box design and also supply boxes as one of the top Mono Carton suppliers in India.
          </p>
        </div>
      </div>
    </section>
    <section className='py-12 text-foreground'>

      <div className="container flex flex-col md:flex-row-reverse md:justify-between items-center text-center md:text-start gap-10 md:gap-16" >
        <img src="/gifting.webp" alt="About Image" className='w-96' />
        <div className="flex flex-col gap-8 ">
          <h2>Kappa Board Boxes for Strong Packaging </h2>
          <p>
            If your product needs strong protection, Kappa board boxes are the right choice. These boxes are made with thick board and are perfect for items that are heavy or need extra safety during shipping. We are experienced Kappa box manufacturers in India, offering high-quality Kappa board packaging for all types of businesses. You can get customized Kappa boxes in India with your branding and design. You can also buy Kappa boxes online in India directly from us.
          </p>

          <p>
            As reliable <a href='https://www.pacmyproduct.com/kappa/cosmetic-boxes'>Kappa board manufacturers in India</a> and trusted Kappa board suppliers in India, we make sure your packaging is strong and looks professional. We also offer creative Kappa board box designs.
          </p>
          <h3>Why Choose Pac My Product?</h3>
          <ul className='list-disc pl-5'>
            <li>Quality materials</li>
            <li>Custom designs</li>
            <li>Fast delivery across India</li>
            <li>Affordable bulk prices</li>
          </ul>
          <p>
            Get strong and stylish Mono Carton and Kappa board packaging from Pac My Product – your trusted packaging partner in India.
          </p>
        </div>
      </div>
    </section>
  </>
  )
}

export default page