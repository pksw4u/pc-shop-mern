import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';
import { Button } from './Button';
import { formatPrice } from '../utils/price';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
           <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
           <span className="text-sm text-gray-500">Stock: {product.stock}</span>
         </div>
        <div className="mt-4">
          <Button
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === 0}
            className="w-full"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};