import api from './api';

export interface DashboardStats {
  stats: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
  };
  recentOrders: any[];
  orderStatusStats: any[];
  monthlyRevenue: any[];
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  options?: any[];
}

export interface CategoryFormData {
  name: string;
  description: string;
  parentCategory?: string;
}

export interface OrderUpdateData {
  status: string;
}

export const adminService = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Products
  getAllProducts: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  createProduct: async (productData: ProductFormData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id: string, productData: Partial<ProductFormData>) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Categories
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  createCategory: async (categoryData: CategoryFormData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id: string, categoryData: Partial<CategoryFormData>) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Orders
  getAllOrders: async (params?: any) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, statusData: OrderUpdateData) => {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  },

  // Users/Customers
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Reports
  getUsersStats: async () => {
    const response = await api.get('/admin/users/stats');
    return response.data;
  },

  getProductsStats: async () => {
    const response = await api.get('/admin/products/stats');
    return response.data;
  },
};