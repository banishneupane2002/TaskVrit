'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';

interface ProductCatalogProps {
  initialProducts: Product[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
 
 //  Grab our cart action from the store!
  const addItem = useCartStore((state) => state.addItem);
 
 // Client-side states for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'none' | 'price-asc' | 'price-desc'>('none');

  

  // Extract unique categories dynamically from the products
  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialProducts.map((p) => p.category)));
    return ['all', ...unique];
  }, [initialProducts]);

  // Client-side filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // 1. Filter by category
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;

        // 2. Filter by search query (case-insensitive)
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [initialProducts, searchTerm, selectedCategory, sortBy]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* 1. Search Bar */}
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="sr-only">Search products</label>
            <input
              id="search"
              type="text"
              placeholder="Search products by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
          </div>

          {/* 2. Sort Dropdown */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">Featured (Default)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3. Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-1">Categories:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors shrink-0 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Clear Button */}
      <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
        <span>
          Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of {initialProducts.length} products
        </span>
        {(searchTerm || selectedCategory !== 'all' || sortBy !== 'none') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('none');
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-base">No products match your search or filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between p-4"
            >
              <div className="w-full h-48 flex items-center justify-center p-2 bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                    {product.category}
                  </span>
                  <h2 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2" title={product.title}>
                    {product.title}
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center text-xs text-amber-500 font-medium">
                    ★ {product.rating?.rate} <span className="text-gray-400 ml-1">({product.rating?.count})</span>
                  </div>
                </div>

                 {/* THE "ADD TO CART" BUTTON */}
                <button
                  onClick={() => addItem(product)}
                  className="w-full mt-3 py-2 px-3 bg-orange-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
>
                 <span>🛒</span>  Add to Cart

            </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}