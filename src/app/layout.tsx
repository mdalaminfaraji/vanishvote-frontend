import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VanishVote - Anonymous Polls that Disappear",
  description: "Create anonymous polls that expire after a set time. No login required.",
  keywords: ["anonymous polls", "temporary polls", "voting", "survey", "expiring polls"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Vanish</span>
              <span className="text-xl font-bold">Vote</span>
            </div>
            <nav className="hidden sm:flex gap-6">
              <Link href="/" className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Home</Link>
              <Link href="/create" className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Create Poll</Link>
            </nav>
            <Link href="/create" className="btn btn-primary hidden sm:block">Create New Poll</Link>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-6 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} VanishVote - Anonymous Polls that Disappear</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
