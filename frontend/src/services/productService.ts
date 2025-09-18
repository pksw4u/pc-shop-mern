import api from './api';
import { Product, Category } from '../types';

export const productService = {
  // Get all products
  getAllProducts: async (params?: {
    category?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Search products
  searchProducts: async (query: string, params?: {
    category?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/products/search', {
      params: { q: query, ...params }
    });
    return response.data;
  },
};

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string, params?: {
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get(`/categories/${categoryId}/products`, { params });
    return response.data;
  },
};