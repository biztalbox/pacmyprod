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
