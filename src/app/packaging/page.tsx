import HeroPackaging from '@/components/HeroPackaging'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Kappa Boxes",
  description: "Pack My Product is a platform that helps you pack your products for your next move.",
};

const page = () => {
  return (
    <HeroPackaging />
  )
}

export default page