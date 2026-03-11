import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZestResume — AI-Powered Resume Builder",
  description:
    "Create an ATS-friendly resume in under 2 minutes with AI-powered suggestions. Stand out with professionally crafted resumes.",
  keywords: ["resume builder", "AI resume", "ATS-friendly", "resume maker", "job application"],
  openGraph: {
    title: "ZestResume — AI-Powered Resume Builder",
    description: "Create an ATS-friendly resume in under 2 minutes.",
    type: "website",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
