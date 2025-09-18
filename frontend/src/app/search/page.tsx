'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { ProductCard, Button, Loading, Input } from '../../components';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'name'>('relevance');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Mock data - will be replaced with API calls
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);

      // Mock search results
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Gaming Laptop RTX 4070',
          description: 'High-performance gaming laptop with RTX 4070 graphics',
          price: 1299.99,
          image: '/images/laptop.jpg',
          category: 'Laptops',
          stock: 10,
        },
        {
          id: '2',
          name: 'Mechanical Keyboard RGB',
          description: 'RGB backlit mechanical keyboard with blue switches',
          price: 149.99,
          image: '/images/keyboard.jpg',
          category: 'Accessories',
          stock: 25,
        },
        {
          id: '3',
          name: '27" 4K Monitor',
          description: 'Ultra HD 4K monitor with HDR support',
          price: 399.99,
          image: '/images/monitor.jpg',
          category: 'Monitors',
          stock: 15,
        },
        {
          id: '4',
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse with customizable buttons',
          price: 49.99,
          image: '/images/mouse.jpg',
          category: 'Accessories',
          stock: 30,
        },
      ];

      // Filter by search query
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filteredProducts);
      setLoading(false);
    };

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'relevance':
      default:
        return 0; // Mock relevance sorting
    }
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category.toLowerCase())))];

  if (loading) {
    return <Loading size="lg" className="min-h-screen flex items-center justify-center" />;
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1"
            />
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          {query && (
            <p className="text-gray-600">
              Showing results for "<span className="font-semibold">{query}</span>"
              {filteredProducts.length > 0 && (
                <span> - {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</span>
              )}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching your search criteria.
                </p>
                <div className="space-x-4">
                  <Button>
                    <Link href="/">Browse All Products</Link>
                  </Button>
                  <Button variant="secondary">
                    <Link href="/categories">Browse Categories</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}