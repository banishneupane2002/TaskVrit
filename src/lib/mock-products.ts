import { Product } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. Hand wash with cold water.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591475155-4284ec28d351?w=500&q=80",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 7,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
    rating: { rate: 3.3, count: 203 }
  },
  {
    id: 8,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80",
    rating: { rate: 2.9, count: 470 }
  }
];