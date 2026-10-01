import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Next.js Server Component (SSR)
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // 1. Get the dynamic id from the URL
  const { id } = await params;

  // 2. Fetch that single product on the server
  let product: Product | null = null;
  try {
    product = await apiClient<Product>(`/products/${id}`);
  } catch (error) {
    notFound(); // Triggers Next.js 404 page if product doesn't exist
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-6">
            <Link
              href="/products"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              ← Back to all products
            </Link>
          </div>

          {/* Product Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image */}
            <div className="p-8 sm:p-12 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 max-w-full object-contain"
              />
            </div>

            {/* Right: Product Info */}
            <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize">
                  {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {product.title}
                </h1>

                {/* Star Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold text-sm">
                    ★ {product.rating?.rate}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({product.rating?.count} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-3xl font-black text-gray-900 pt-2">
                  ${product.price.toFixed(2)}
                </div>

                {/* Full Description */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Add to Cart Section (Interactive Client Button) */}
              <div className="border-t border-gray-100 pt-6">
                <AddToCartButton product={product} />
              </div>

            </div>

          </div>

        </div>
      </main>

      <CartDrawer />
    </div>
  );
}