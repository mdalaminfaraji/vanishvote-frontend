import Link from 'next/link';
import { FaLock, FaHourglassEnd, FaPoll } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              <span className="text-indigo-600 dark:text-indigo-400">Anonymous</span> Polls that <span className="text-indigo-600 dark:text-indigo-400">Disappear</span>
            </h1>
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
              Create polls that automatically vanish after a set time. No login required, complete privacy, and simple sharing. Perfect for quick decisions and sensitive topics.
            </p>
            <div className="flex gap-4">
              <Link href="/create" className="btn btn-primary">
                Create Poll
              </Link>
              <a href="#features" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="card p-8 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-xl font-semibold mb-4">Sample Poll</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">What&apos;s your favorite programming language?</p>
              <div className="space-y-3 mb-6">
                <div className="w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer">
                  JavaScript
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer">
                  Python
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer">
                  Java
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer">
                  C++
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Expires in 24 hours • 15 votes so far</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose VanishVote?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
              <FaLock className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Privacy</h3>
            <p className="text-slate-700 dark:text-slate-300">
              No logins or personal information required. Vote anonymously and securely without leaving a trace.
            </p>
          </div>
          
          <div className="card flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
              <FaHourglassEnd className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Self-Destructing</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Polls automatically disappear after 1, 12, or 24 hours. Your data doesn&apos;t stick around forever.
            </p>
          </div>
          
          <div className="card flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
              <FaPoll className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple to Use</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Create polls in seconds, share via a unique link, and view real-time results. No technical knowledge needed.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-center">Create</h3>
            </div>
            <div className="md:w-3/4">
              <p className="text-slate-700 dark:text-slate-300">
                Create your poll in seconds. Add a title, your options, and set an expiration time (1, 12, or 24 hours). Choose whether to hide results until the poll ends or make them visible in real-time.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-center">Share</h3>
            </div>
            <div className="md:w-3/4">
              <p className="text-slate-700 dark:text-slate-300">
                Get a unique link for your poll that you can share with anyone via text, email, or social media. If your poll is private, only people with the link can access it.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-center">Vote & View</h3>
            </div>
            <div className="md:w-3/4">
              <p className="text-slate-700 dark:text-slate-300">
                Participants vote with a single click. Watch results update in real-time (unless you&apos;ve chosen to hide them). After the poll expires, it&apos;s automatically deleted from our system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-12">
        <div className="card bg-indigo-600 dark:bg-indigo-600 text-white text-center p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your First Poll?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            It&apos;s free, anonymous, and takes less than a minute to get started. Your poll will be ready to share instantly.
          </p>
          <Link href="/create" className="btn bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 text-lg font-medium">
            Create Poll Now
          </Link>
        </div>
      </section>
    </div>
  );
}
