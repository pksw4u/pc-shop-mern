import { Router } from 'express';
import { createOrder, getUserOrders, getAllOrders, getOrderById, updateOrderStatus, cancelOrder } from '../controllers/order.controller';
import authMiddleware from '../middleware/auth';
import { validateOrder } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// User routes
router.post('/', validateOrder, createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;