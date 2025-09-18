'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components';
import { RootState } from '../../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/price';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const formatOptions = (options?: Record<string, string>) => {
    if (!options || Object.keys(options).length === 0) return '';
    return Object.entries(options)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 002 2h2a2 2 0 002-2v-3a2 2 0 00-2-2H5m14 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h12a2 2 0 012 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${JSON.stringify(item.selectedOptions)}`} className="bg-white border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <Link href={`/products/${item.product.id}`} className="hover:text-blue-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          {formatOptions(item.selectedOptions)}
                        </p>
                      )}
                      <p className="text-gray-600 mt-1">{formatPrice(item.product.price)} each</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                       <div className="text-right">
                         <p className="text-lg font-semibold">
                           {formatPrice(item.product.price * item.quantity)}
                         </p>
                       </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6">
              <Button variant="danger" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                 <div className="flex justify-between">
                   <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                   <span>{formatPrice(total)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Shipping:</span>
                   <span>Free</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Tax:</span>
                   <span>{formatPrice(total * 0.08)}</span>
                 </div>
               </div>

               <hr className="my-4" />

               <div className="flex justify-between text-xl font-semibold mb-6">
                 <span>Total:</span>
                 <span>{formatPrice(total + total * 0.08)}</span>
               </div>

              <Button size="lg" className="w-full mb-4">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="secondary" size="lg" className="w-full">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}