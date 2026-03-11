import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ZestResume — AI-Powered Resume Builder",
    template: "%s | ZestResume",
  },
  description:
    "Create an ATS-friendly resume in under 2 minutes with AI-powered suggestions. Stand out with professionally crafted resumes and elite templates.",
  keywords: [
    "resume builder",
    "AI resume",
    "ATS-friendly",
    "resume maker",
    "job application",
    "AI resume writer",
    "ATS resume checker",
    "professional resume templates",
  ],
  authors: [{ name: "ZestResume Team" }],
  creator: "ZestResume",
  publisher: "ZestResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://zestresume.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZestResume — AI-Powered Resume Builder",
    description: "Create an ATS-friendly resume in under 2 minutes with AI. Stand out from the crowd.",
    url: "https://zestresume.com",
    siteName: "ZestResume",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZestResume — AI-Powered Resume Builder",
    description: "Create an ATS-friendly resume in under 2 minutes with AI.",
    creator: "@zestresume",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ZestResume",
    url: "https://zestresume.com",
    description: "AI-Powered Resume Builder for modern professionals.",
    applicationCategory: "CareerSoftware",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
