import api from './api';

export interface PCComponent {
  id: string;
  name: string;
  price: number;
  category: string;
  specs: string;
  compatible: boolean;
  socket?: string;
  chipset?: string;
  memoryType?: string;
  wattage?: number;
  formFactor?: string;
}

export const buildPCService = {
  // Get all PC components
  getAllComponents: async () => {
    const response = await api.get('/build-pc/components');
    return response.data;
  },

  // Get components by category
  getComponentsByCategory: async (category: string) => {
    const response = await api.get(`/build-pc/components/${category}`);
    return response.data;
  },

  // Check component compatibility
  checkCompatibility: async (components: PCComponent[]) => {
    const response = await api.post('/build-pc/compatibility', { components });
    return response.data;
  },

  // Save custom build
  saveBuild: async (buildData: {
    name: string;
    components: PCComponent[];
    totalPrice: number;
  }) => {
    const response = await api.post('/build-pc/saves', buildData);
    return response.data;
  },

  // Get saved builds
  getSavedBuilds: async () => {
    const response = await api.get('/build-pc/saves');
    return response.data;
  },

  // Get build recommendations
  getBuildRecommendations: async (budget: number, useCase: string) => {
    const response = await api.get('/build-pc/recommendations', {
      params: { budget, useCase }
    });
    return response.data;
  },
};