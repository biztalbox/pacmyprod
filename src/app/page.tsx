import About from "@/components/About";
import Counter from "@/components/Counter";
import HeroHome2 from "@/components/HeroHome2";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pac My Product: Premium Printing & Packaging Solutions",
  description: "Pac My Product exclusively offers printing and packaging solutions to represent a brand’s perspective and enhance user experience. Get custom boxes, labels, and more with premium quality and efficient delivery",
};


export default function Home() {
  return (
    <main>
      <HeroHome2 />
      <About />
    </main>
  );
}
