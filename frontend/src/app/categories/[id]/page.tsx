'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { ProductCard, Button, Loading } from '../../../components';
import { Product, Category } from '../../../types';
import { addToCart } from '../../../store/slices/cartSlice';

export default function CategoryPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('name');
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 5000]);

  // Mock data - will be replaced with API calls
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);

      // Mock category data
      const mockCategory: Category = {
        id: categoryId,
        name: categoryId === '1' ? 'Laptops' : categoryId === '2' ? 'Desktops' : 'Components',
        description: `Browse our ${categoryId === '1' ? 'laptops' : categoryId === '2' ? 'desktops' : 'components'} collection`,
        image: '/images/category.jpg',
      };

      // Mock products for the category
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Gaming Laptop RTX 4070',
          description: 'High-performance gaming laptop',
          price: 1299.99,
          image: '/images/laptop.jpg',
          category: mockCategory.name,
          stock: 10,
        },
        {
          id: '2',
          name: 'Business Laptop i7',
          description: 'Professional business laptop',
          price: 899.99,
          image: '/images/laptop2.jpg',
          category: mockCategory.name,
          stock: 15,
        },
        {
          id: '3',
          name: 'Ultrabook 13"',
          description: 'Lightweight ultrabook',
          price: 699.99,
          image: '/images/ultrabook.jpg',
          category: mockCategory.name,
          stock: 8,
        },
      ];

      setCategory(mockCategory);
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return 0; // Mock - would use date in real app
      default:
        return 0;
    }
  });

  const filteredProducts = sortedProducts.filter(
    (product) => product.price >= filterPrice[0] && product.price <= filterPrice[1]
  );

  if (loading) {
    return <Loading size="lg" className="min-h-screen flex items-center justify-center" />;
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Button>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-gray-600 text-lg">{category.description}</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range:</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filterPrice[0]}
                onChange={(e) => setFilterPrice([Number(e.target.value), filterPrice[1]])}
                className="border border-gray-300 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="self-center">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filterPrice[1]}
                onChange={(e) => setFilterPrice([filterPrice[0], Number(e.target.value)])}
                className="border border-gray-300 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your filters or browse other categories.</p>
            <Button>
              <Link href="/">Browse All Categories</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}