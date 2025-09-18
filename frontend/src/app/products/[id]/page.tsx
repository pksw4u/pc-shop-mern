'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Loading } from '../../../components';
import { Product } from '../../../types';
import { addToCart } from '../../../store/slices/cartSlice';

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Mock data - will be replaced with API calls
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // Mock product data
      const mockProduct: Product = {
        id: productId,
        name: 'Gaming Laptop RTX 4070',
        description: 'High-performance gaming laptop with RTX 4070 graphics, 16GB RAM, 512GB SSD, and 15.6" 144Hz display. Perfect for gaming and content creation.',
        price: 1299.99,
        image: '/images/laptop.jpg',
        category: 'Laptops',
        stock: 10,
        options: [
          {
            name: 'RAM',
            values: ['16GB', '32GB', '64GB'],
          },
          {
            name: 'Storage',
            values: ['512GB SSD', '1TB SSD', '2TB SSD'],
          },
          {
            name: 'Color',
            values: ['Black', 'Silver', 'Blue'],
          },
        ],
      };

      setProduct(mockProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        product,
        quantity,
        selectedOptions,
      }));
      // Could show a success message here
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return <Loading size="lg" className="min-h-screen flex items-center justify-center" />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock gallery images
  const galleryImages = [
    product.image,
    '/images/laptop-side.jpg',
    '/images/laptop-open.jpg',
    '/images/laptop-keyboard.jpg',
  ];

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${product.category.toLowerCase()}`} className="text-blue-600 hover:text-blue-800">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <Image
                src={galleryImages[selectedImage]}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Product Options */}
            {product.options && product.options.map((option) => (
              <div key={option.name} className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{option.name}</h3>
                <div className="flex gap-2 flex-wrap">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`px-4 py-2 border rounded ${
                        selectedOptions[option.name] === value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
                <span className="text-gray-600">({product.stock} available)</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full mb-4"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Category:</span> {product.category}
                </div>
                <div>
                  <span className="font-semibold">Stock:</span> {product.stock} units
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}