import About from "@/components/About";
import Counter from "@/components/Counter";
import HeroHome2 from "@/components/HeroHome2";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Premium Printing & Gifting Packaging in India | Custom Luxury Solutions",
  description: "Discover high-end printing and gifting packaging solutions in India. Custom boxes, luxury finishes, and eco-friendly materials to elevate your brand for events, corporate gifts, and retail.",
  alternates: {
    canonical: "https://pacmyproduct.com",
  },
};


export default function Home() {
  return (
    <>
      <SchemaMarkup 
        category="Premium Packaging & Printing Services"
        breadcrumbName="Home"
        breadcrumbPath=""
        includeProduct={false}
        includeService={true}
        includeRating={true}
        serviceName="Premium Packaging & Printing Solutions"
        serviceDescription="Leading provider of premium packaging and printing solutions in India. Specializing in mono carton boxes, kappa board packaging, corporate gifting, and custom luxury packaging with eco-friendly materials and premium finishes."
        pageType="home"
      />
      <main>
        <HeroHome2 />
        <About />
      </main>
    </>
  );
}
