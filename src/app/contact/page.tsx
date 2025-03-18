import ContactPage from '@/components/ContactPage';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Contact Us",
    description: "Pack My Product is a platform that helps you pack your products for your next move.",
};

export default function App() {

    return (
        <ContactPage />
    )
}