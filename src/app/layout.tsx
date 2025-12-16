import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Pack My Product",
  description: "Pack My Product is a platform that helps you pack your products for your next move.",
  verification: {
    google: "GbP-rQialfYwuxbG5Iqoq_24xYfYCJNVFgK4hcJ9yo8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q32SC4DSPX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q32SC4DSPX');
          `}
        </Script>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "uio98jhyut");
        `}
      </Script>
      </head>
      <body className="font-inter antialiased">
        <Header />
        {children}
        <Footer />
        
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919599139303?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
        </a>
        
        <Analytics />
      </body>
    </html>
  );
}
