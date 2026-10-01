import { apiClient } from '@/lib/api';
import { Product } from '@/types/product';
import ProductCatalog from '@/components/ProductCatalog';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

export default async function ProductsPage() {
  const products = await apiClient<Product[]>('/products');

  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Our new Top Bar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Product Catalog
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Server-side rendered catalog with interactive client-side search and filters.
            </p>
          </div>

          <ProductCatalog initialProducts={products} />
        </div>
      </main>
       <CartDrawer />
    </div>
  );
}