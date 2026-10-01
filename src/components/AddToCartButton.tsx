'use client';

import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
    >
      <span>🛒</span> Add to Cart
    </button>
  );
}