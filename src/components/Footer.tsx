"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Vanish</span>
              <span className="text-lg font-bold">Vote</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Create anonymous polls that expire after a set time. No login required.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200">Home</Link>
              <Link href="/create" className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200">Create Poll</Link>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              VanishVote is a service for creating anonymous polls that disappear after a set time, ensuring your data stays private.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} VanishVote - Anonymous Polls that Disappear</p>
        </div>
      </div>
    </footer>
  );
}
