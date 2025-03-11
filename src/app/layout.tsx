import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VanishVote - Anonymous Polls",
  description: "Create anonymous polls that expire automatically",
  keywords: ["anonymous polls", "temporary polls", "voting", "survey", "expiring polls"],
  icons: {
    icon: "/vote.png",
    apple: "/vote.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
            {children}
          </div>
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
