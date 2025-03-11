"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            Vanish
          </span>
          <span className="text-xl font-bold">Vote</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Create Poll
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/create"
            className="btn btn-primary transition-transform hover:scale-105"
          >
            Create New Poll
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-transform duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href="/"
            className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors duration-200 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/create"
            className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors duration-200 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create Poll
          </Link>
          <Link
            href="/create"
            className="btn btn-primary w-full text-center py-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create New Poll
          </Link>
        </div>
      </div>
    </header>
  );
}
