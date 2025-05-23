import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Kappa Solutions | Pac My Product",
    description: "Explore our premium Kappa packaging solutions. From cosmetic boxes to electronic packaging, we offer durable and stylish packaging options for various industries.",
    alternates: {
        canonical: "https://pacmyproduct.com/kappa",
    },
    openGraph: {
        title: "Kappa Solutions | Pac My Product",
        description: "Explore our premium Kappa packaging solutions. From cosmetic boxes to electronic packaging, we offer durable and stylish packaging options for various industries.",
        type: "website",
        url: "https://pacmyproduct.com/kappa",
        images: [
            {
                url: "https://pacmyproduct.com/kappa/desktop/cosmetic.webp",
                width: 1200,
                height: 630,
                alt: "Kappa Solutions",
            },
        ],
        siteName: "Pac My Product",
    },
};

export default function Page() {
    redirect('/kappa/cosmetic-boxes');
    return (
        <main className='redish_section min-h-screen'>
        </main>
    )
}