import { MOCK_PRODUCTS } from './mock-products';

const BASE_URL = 'https://fakestoreapi.com';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  // Real browser headers so Cloudflare doesn't block Vercel servers
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'application/json, text/plain, */*',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new ApiError(`Remote API error: ${response.status}`, response.status);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Notice] FakeStoreAPI unreachable on cloud server (${error}). Using fallback.`);

    // 1. If asking for a SINGLE product like /products/1
    const parts = cleanEndpoint.split('/').filter(Boolean);
    if (parts[0] === 'products' && parts[1]) {
      const targetId = Number(parts[1]);
      const foundProduct = MOCK_PRODUCTS.find((p) => p.id === targetId);
      if (foundProduct) {
        return foundProduct as unknown as T;
      }
    }

    // 2. If asking for ALL products
    if (cleanEndpoint.includes('/products')) {
      return MOCK_PRODUCTS as unknown as T;
    }

    throw error;
  }
}