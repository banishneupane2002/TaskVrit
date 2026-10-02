import Link from 'next/link';
import ServiceSection from '@/components/figma/ServiceSection';
import CoursesSection from '@/components/figma/CoursesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-gray-900 tracking-tight">
              VRIT <span className="text-blue-600">TECH</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 rounded-full">
              Frontend Task
            </span>
          </div>

          {/* Navigation Links to Both Tasks */}
          <div className="flex items-center gap-4">
            <a
              href="#figma-demo"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Task B (Figma)
            </a>
            <Link
              href="/products"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>🛒 Task A (Store)</span>
              <span className="text-xs">→</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Content: Task B (Figma Sections) */}
      <main id="figma-demo" className="flex-1 space-y-8 divide-y divide-gray-100 pb-16">
        
        {/* Frame 1: Services & Partners */}
        <ServiceSection />

        {/* Frame 2: Hot Courses */}
        <CoursesSection />

        {/* Task A Call-to-Action Banner */}
        <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                Task A Submission
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">
                Explore the E-Commerce Dashboard
              </h3>
              <p className="text-blue-100 text-sm mt-2 max-w-xl">
                Server-Side Rendered (SSR) catalog with client-side filtering, category selection, price sorting, and persistent shopping cart powered by Zustand.
              </p>
            </div>
            <Link
              href="/products"
              className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 text-sm font-extrabold rounded-xl shadow-lg transition-colors whitespace-nowrap"
            >
              Launch Store Demo →
            </Link>
          </div>
        </div>

      </main>

      {/* 3. Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        <p>Built with Next.js 15, TypeScript & Tailwind CSS • Candidate Assessment for Vrit Technologies</p>
      </footer>

    </div>
  );
}