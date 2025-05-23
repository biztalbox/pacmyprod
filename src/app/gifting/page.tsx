import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gifting Solutions | Pac My Product",
    description: "Discover our thoughtful and sustainable gifting solutions. From corporate gifts to personalized hampers, we create memorable experiences through thoughtful packaging.",
    alternates: {
        canonical: "https://pacmyproduct.com/gifting",
    },
    openGraph: {
        title: "Gifting Solutions | Pac My Product",
        description: "Discover our thoughtful and sustainable gifting solutions. From corporate gifts to personalized hampers, we create memorable experiences through thoughtful packaging.",
        type: "website",
        url: "https://pacmyproduct.com/gifting",
        images: [
            {
                url: "https://pacmyproduct.com/gifting/desktop/corporate.webp",
                width: 1200,
                height: 630,
                alt: "Gifting Solutions",
            },
        ],
        siteName: "Pac My Product",
    },
};

export default function Page() {
    redirect('/gifting/corporate-gifting');
    return (
        <main className='redish_section min-h-screen'>
        </main>
    )
}