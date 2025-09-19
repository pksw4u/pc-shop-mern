'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { adminService } from '../../../services/adminService';

const AdminReports = () => {
  const [userStats, setUserStats] = useState<any>(null);
  const [productStats, setProductStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [userData, productData] = await Promise.all([
        adminService.getUsersStats(),
        adminService.getProductsStats(),
      ]);
      setUserStats(userData);
      setProductStats(productData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">View detailed analytics and reports</p>
        </div>
        <button
          onClick={fetchReports}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Statistics</h2>
          {userStats ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Users by Role</h3>
                <div className="space-y-2">
                  {userStats.usersByRole?.map((role: any) => (
                    <div key={role._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{role._id || 'User'}</span>
                      <span className="text-sm font-medium text-gray-900">{role.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Recent Users</h3>
                <div className="space-y-2">
                  {userStats.recentUsers?.slice(0, 5).map((user: any) => (
                    <div key={user._id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{user.name}</span>
                      <span className="text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No user statistics available</p>
          )}
        </div>

        {/* Product Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Statistics</h2>
          {productStats ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Low Stock Products</h3>
                <div className="space-y-2">
                  {productStats.lowStockProducts?.slice(0, 5).map((product: any) => (
                    <div key={product._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{product.name}</span>
                      <span className="text-sm font-medium text-red-600">{product.stock} left</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Products by Category</h3>
                <div className="space-y-2">
                  {productStats.productsByCategory?.slice(0, 5).map((category: any) => (
                    <div key={category._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{category._id}</span>
                      <span className="text-sm font-medium text-gray-900">{category.count} products</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No product statistics available</p>
          )}
        </div>
      </div>

      {/* Sales Report Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Report</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Sales analytics chart will be implemented here</p>
            <p className="text-sm text-gray-400">Revenue trends, top products, customer analytics</p>
          </div>
        </div>
      </div>

      {/* Customer Report Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Report</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Customer analytics chart will be implemented here</p>
            <p className="text-sm text-gray-400">Customer demographics, purchase patterns, retention rates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;