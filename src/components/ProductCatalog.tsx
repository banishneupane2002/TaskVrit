'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';

interface ProductCatalogProps {
  initialProducts: Product[];
}

const ITEMS_PER_PAGE = 8; // Number of items to display per page

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'none' | 'price-asc' | 'price-desc'>('none');

  // 1. Pagination State: remembers which page we are on
  const [currentPage, setCurrentPage] = useState(1);

  // Categories list
  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialProducts.map((p) => p.category)));
    return ['all', ...unique];
  }, [initialProducts]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
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

  // 2. Whenever the user types a new search or changes category, reset back to Page 1!
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // 3. Pagination Math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search products by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

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

        {/* Categories */}
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

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
        <span>
          Showing <strong className="text-gray-900">{paginatedProducts.length}</strong> of{' '}
          {filteredProducts.length} filtered items (Page {currentPage} of {totalPages})
        </span>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-base">No products match your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
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
                  <Link href={`/products/${product.id}`}>
                    <h2 className="mt-2 text-sm font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 transition-colors cursor-pointer" title={product.title}>
                      {product.title}
                    </h2>
                  </Link>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center text-xs text-amber-500 font-medium">
                      ★ {product.rating?.rate} <span className="text-gray-400 ml-1">({product.rating?.count})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="w-full mt-3 py-2 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>🛒</span> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Pagination Controls (Previous / 1, 2, 3 / Next) */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {/* Previous Button */} 
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {/* Number Buttons: [1] [2] [3] */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  );
}