'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { ProductCard, Button } from '../components';
import { Product, Category } from '../types';
import { addToCart } from '../store/slices/cartSlice';
import { productService } from '../services';

export default function Home() {
  const dispatch = useDispatch();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Mock data - will be replaced with API calls
  useEffect(() => {
    // Mock featured products
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Gaming Laptop RTX 4070',
        description: 'High-performance gaming laptop with RTX 4070 graphics',
        price: 129999,
        image: '/images/laptop.jpg',
        category: 'Laptops',
        stock: 10,
      },
      {
        id: '2',
        name: 'Mechanical Keyboard RGB',
        description: 'RGB backlit mechanical keyboard with blue switches',
        price: 4999,
        image: '/images/keyboard.jpg',
        category: 'Accessories',
        stock: 25,
      },
      {
        id: '3',
        name: '27" 4K Monitor',
        description: 'Ultra HD 4K monitor with HDR support',
        price: 24999,
        image: '/images/monitor.jpg',
        category: 'Monitors',
        stock: 15,
      },
    ];

    const mockCategories: Category[] = [
      { id: '1', name: 'Laptops', description: 'Gaming and business laptops', image: '/images/laptops.jpg' },
      { id: '2', name: 'Desktops', description: 'Custom and pre-built desktops', image: '/images/desktops.jpg' },
      { id: '3', name: 'Components', description: 'PC parts and components', image: '/images/components.jpg' },
      { id: '4', name: 'Accessories', description: 'Keyboards, mice, and peripherals', image: '/images/accessories.jpg' },
    ];

    setFeaturedProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Hero Image - Replace with your PC/RGB image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('/images/hero-pc.jpg')`, // Add your hero image here
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          {/* Fallback gradient if image doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
          {/* RGB Light Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Unleash Your Potential.
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                Build Your Dream Machine.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Cutting-edge Components & Complete Systems for Every Enthusiast.
              Experience unparalleled performance with our expert-curated selection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/20">
                <Link href="/products" className="flex items-center gap-3 text-lg">
                  <span>🛒</span>
                  Shop Now
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-white/10 transform hover:scale-105 transition-all duration-300">
                <Link href="/build-pc" className="flex items-center gap-3 text-lg">
                  <span>🔧</span>
                  Explore Components
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Warranty Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Computer Shop?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with exceptional service to deliver
              the ultimate computing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience blazing-fast performance with our premium hardware selection
                and expert assembly services.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🛠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom Builds</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create your perfect PC with our interactive build wizard and compatibility
                checking technology.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get 24/7 technical support and warranty coverage for all your purchases
                and custom builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Explore our comprehensive range of computer products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {index === 0 ? '💻' : index === 1 ? '🖥️' : index === 2 ? '🔧' : '⌨️'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{category.description}</p>
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      <span>Explore</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Handpicked premium products for the best experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/products" className="flex items-center gap-2">
                <span>View All Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Build Your Dream PC?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust us with their computing needs.
            Start building today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/build-pc">Start Building Now</Link>
            </Button>
            <Button variant="secondary" size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/contact">Get Expert Help</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}