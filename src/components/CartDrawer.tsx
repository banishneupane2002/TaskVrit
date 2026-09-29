'use client';

import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  // 1. Get everything we need from our Zustand store
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  // If the drawer is NOT open, don't show anything on screen!
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 1. Dark background overlay (clicking it closes the cart) */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* 2. The sliding panel on the right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Shopping Cart ({items.length})
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-4xl">🛒</span>
                <p className="mt-3 text-gray-500 text-sm">Your cart is currently empty.</p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-white p-1 rounded-lg border border-gray-200 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls (- and +) */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 text-xs p-1"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer: Total & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={() => alert('Checkout feature coming soon!')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}