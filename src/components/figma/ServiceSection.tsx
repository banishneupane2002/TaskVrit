'use client';

import { useRef, useState, useEffect } from 'react';

const WORKSPACE_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80',
    alt: 'Laptop and workspace with coffee',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    alt: 'Tech device and calculator',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    alt: 'Web design and creative layout',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Collaborative development team',
  },
];

export default function ServiceSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(25);

  // 1. Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // 2. Track scroll progress for the Figma progress bar
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const totalScroll = scrollWidth - clientWidth;
    if (totalScroll > 0) {
      const progress = Math.min(Math.max((scrollLeft / totalScroll) * 100, 20), 100);
      setScrollProgress(progress);
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. TOP ROW: Description on Left, Big Titles on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
        <div className="space-y-6">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-sm transition-colors">
            Services
          </button>
          <p className="text-gray-700 text-lg sm:text-xl font-medium leading-relaxed max-w-md">
            Experience our expert solutions tailored to enhance your business with top-tier design, development, and animation.
          </p>
        </div>

        <div className="flex flex-col md:items-end justify-center space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            UI & UX
          </h2>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Development
          </h2>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Blockchain
          </h2>
        </div>
      </div>

      {/* 2. DRAGGABLE CAROUSEL */}
      <div className="relative mb-6">
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
          className={`flex gap-6 overflow-x-auto scrollbar-none select-none pb-4 cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WORKSPACE_IMAGES.map((img, index) => (
            <div
              key={img.id}
              className={`relative rounded-3xl overflow-hidden shadow-sm shrink-0 h-72 sm:h-96 ${
                index === 0 ? 'w-[75vw] sm:w-[650px]' : 'w-[50vw] sm:w-[420px]'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* The "Drag" Pill on the primary card */}
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md text-gray-800 text-xs font-bold flex items-center justify-center shadow-xl border border-white/60">
                    Drag
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* The Figma Scroll Progress Bar Track */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gray-900 transition-all duration-150 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* 3. BOTTOM ROW: Our Partners */}
      <div className="pt-12 border-t border-gray-100 text-center">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                  Our Partners
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 text-gray-800">
          
          {/* Partner 1: Cloud Innovation */}
          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-7 text-gray-800" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 28h24a10 10 0 002-19.8 14 14 0 00-26.6 4.2A8 8 0 0012 28z" strokeLinejoin="round" />
              <path d="M18 20a6 6 0 0110-3" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] font-bold tracking-tight text-gray-700">
              Cloud Innovation
            </span>
          </div>
          {/* Partner 2: CMC */}
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8Z" />
            </svg>
            <span className="text-xl font-black tracking-tight text-gray-900">
              CMC
            </span>
          </div>
          {/* Partner 3: IT SNP (Official community scalloped badge) */}
          <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 100 100">
              {/* Scalloped Gear Badge */}
              <circle cx="50" cy="50" r="44" fill="#1E293B" stroke="#0F172A" strokeWidth="2" strokeDasharray="6 3" />
              <text x="50" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily="sans-serif">
                IT
              </text>
              <text x="50" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="sans-serif">
                SNP
              </text>
            </svg>
            <span className="text-base font-extrabold tracking-tight text-gray-800">
              IT SNP
            </span>
          </div>
          {/* Partner 4: Zebec (Official Zebec Protocol Emblem) */}
          <div className="flex items-center gap-2.5 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18c0 6.6 5.4 10 10 10s10-3.4 10-10H6z" />
              <path d="M16 6v12" />
              <path d="M16 6l7 6" />
            </svg>
            <span className="text-lg font-black tracking-tight text-gray-900">
              Zebec
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}