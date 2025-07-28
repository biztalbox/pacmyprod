import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";

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
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.pacmyproduct.com",
                  "name": "Pac My Product",
                  "url": "https://www.pacmyproduct.com/",
                  "logo": "https://www.pacmyproduct.com/logo.png",
                  "description": "Pac My Product offers expert packaging design, prototyping, and printing solutions tailored to elevate brand experiences across various industries.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "6th Floor, TOWER-A, Digital Greens, A-6-014, Golf Course Ext Rd, The Close South, Sector-61, Gurugram, Haryana 122102",
                    "addressLocality": "Gurugram",
                    "addressRegion": "Delhi",
                    "postalCode": "122102",
                    "addressCountry": "IN"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "9818601834",
                    "contactType": "Customer Support",
                    "areaServed": "IN"
                  },
                  "sameAs": [
                    "https://in.linkedin.com/company/pac-my-product"
                  ],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "265"
                  }
                },
                {
                  "@type": "Service",
                  "@id": "https://www.pacmyproduct.com/",
                  "serviceType": "Packaging Solutions",
                  "provider": {
                    "@id": "https://www.pacmyproduct.com/"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "India"
                  },
                  "description": "We specialize in custom product packaging design, box prototyping, and printing services for businesses across FMCG, cosmetics, pharma, and more.",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "On Request",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-inter antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
