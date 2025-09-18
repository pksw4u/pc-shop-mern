'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2023',
  };

  const tabs = [
    { id: 'profile', label: 'Profile', href: '/account/profile' },
    { id: 'orders', label: 'Order History', href: '/account/orders' },
    { id: 'addresses', label: 'Addresses', href: '/account/addresses' },
  ];

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since {user.memberSince}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  >
                    {tab.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <Button variant="secondary" className="w-full">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <p className="text-gray-900">{user.memberSince}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>
                    <Link href="/account/profile">Edit Profile</Link>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {/* Mock orders */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Order #12345</p>
                        <p className="text-sm text-gray-600">Placed on January 15, 2024</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Delivered</span>
                    </div>
                    <p className="text-sm text-gray-600">Gaming Laptop RTX 4070, Mechanical Keyboard</p>
                    <p className="font-semibold mt-2">$1,449.99</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Order #12344</p>
                        <p className="text-sm text-gray-600">Placed on January 10, 2024</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">Shipped</span>
                    </div>
                    <p className="text-sm text-gray-600">27" 4K Monitor</p>
                    <p className="font-semibold mt-2">$399.99</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>
                    <Link href="/account/orders">View All Orders</Link>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Home Address</h3>
                    <p className="text-gray-600">
                      John Doe<br />
                      123 Main Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Add New Address</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}