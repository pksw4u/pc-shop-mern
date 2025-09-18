'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1449.99,
      items: [
        { name: 'Gaming Laptop RTX 4070', quantity: 1, price: 1299.99 },
        { name: 'Mechanical Keyboard RGB', quantity: 1, price: 149.99 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 399.99,
      items: [
        { name: '27" 4K Monitor', quantity: 1, price: 399.99 },
      ],
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'pending',
      total: 249.99,
      items: [
        { name: 'Wireless Mouse', quantity: 2, price: 49.99 },
        { name: 'USB Cable', quantity: 1, price: 149.99 },
      ],
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/account" className="text-blue-600 hover:text-blue-800">Account</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Orders</span>
        </nav>

        <div className="bg-white border rounded-lg">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-600 mt-2">View and track your orders</p>
          </div>

          <div className="divide-y">
            {orders.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                <Button>
                  <Link href="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-lg font-semibold mt-1">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Items:</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                    {order.status === 'shipped' && (
                      <Button variant="secondary" size="sm">
                        Track Package
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <Button variant="secondary" size="sm">
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}