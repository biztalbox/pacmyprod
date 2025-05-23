import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mono Solutions | Pac My Product",
    description: "Discover our versatile Mono packaging solutions. From cosmetic boxes to pharmaceutical packaging, we provide high-quality mono carton solutions for various industries.",
    alternates: {
        canonical: "https://pacmyproduct.com/mono",
    },
    openGraph: {
        title: "Mono Solutions | Pac My Product",
        description: "Discover our versatile Mono packaging solutions. From cosmetic boxes to pharmaceutical packaging, we provide high-quality mono carton solutions for various industries.",
        type: "website",
        url: "https://pacmyproduct.com/mono",
        images: [
            {
                url: "https://pacmyproduct.com/mono/desktop/cosmetic.webp",
                width: 1200,
                height: 630,
                alt: "Mono Solutions",
            },
        ],
        siteName: "Pac My Product",
    },
};

export default function Page() {
    redirect('/mono/cosmetic-boxes');
    return (
        <main className='redish_section min-h-screen'>
        </main>
    )
}