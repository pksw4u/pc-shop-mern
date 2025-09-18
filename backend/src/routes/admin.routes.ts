import { Router } from 'express';
import { getDashboardStats, getUsersStats, getProductsStats } from '../controllers/admin.controller';
import authMiddleware from '../middleware/auth';

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware);

// GET /api/admin/dashboard
router.get('/dashboard', getDashboardStats);

// GET /api/admin/users/stats
router.get('/users/stats', getUsersStats);

// GET /api/admin/products/stats
router.get('/products/stats', getProductsStats);

export default router;