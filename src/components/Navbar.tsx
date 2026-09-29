'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  // 1. Walkie-talkie: Talk to our cart store
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);

  // 2. Wait until the browser is ready so localStorage can load safely
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Store Name / Logo */}
        <Link href="/products" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-blue-600">
            Vrit<span className="text-gray-900">Store</span>
          </span>
        </Link>

        {/* Right: Cart Button */}
        <button
          onClick={openCart}
          className="relative flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
        >
          
          <span>🛒 Cart</span>

          {/* Number Badge (Only shows count when browser is ready) */}
          <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
            {mounted ? totalItems : 0}
          </span>
        </button>

      </div>
    </header>
  );
}