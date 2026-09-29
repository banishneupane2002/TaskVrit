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

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    // Helps prevent public APIs from blocking server requests
    'User-Agent': 'Mozilla/5.0 (compatible; NextJsEcommerce/1.0)',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // Disable aggressive caching during development so we always see fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new ApiError(`Remote API error: ${response.status}`, response.status);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Notice] FakeStoreAPI is unreachable (${error}). Using fallback data.`);
    
    // If the API is down and asking for products, return our mock data!
    
    if (cleanEndpoint.includes('/products')) {
      return MOCK_PRODUCTS as unknown as T;
    }
    throw error;
  }
}