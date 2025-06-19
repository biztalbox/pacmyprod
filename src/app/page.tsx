import About from "@/components/About";
import Counter from "@/components/Counter";
import HeroHome2 from "@/components/HeroHome2";
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
    <main>
      <HeroHome2 />
      <About />
    </main>
  );
}
