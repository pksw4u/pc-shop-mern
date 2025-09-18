import { Router } from 'express';
import { createPayment, processPayment, getPaymentById, getPaymentsByOrder, getAllPayments, createRazorpayOrder, verifyRazorpayPayment, razorpayWebhook } from '../controllers/payment.controller';
import authMiddleware from '../middleware/auth';

const router = Router();

// Webhook route (no auth required)
router.post('/razorpay/webhook', razorpayWebhook);

// All other routes require authentication
router.use(authMiddleware);

// POST /api/payments
router.post('/', createPayment);

// POST /api/payments/razorpay/order
router.post('/razorpay/order', createRazorpayOrder);

// POST /api/payments/razorpay/verify
router.post('/razorpay/verify', verifyRazorpayPayment);

// PUT /api/payments/:paymentId/process
router.put('/:paymentId/process', processPayment);

// GET /api/payments/:id
router.get('/:id', getPaymentById);

// GET /api/payments/order/:orderId
router.get('/order/:orderId', getPaymentsByOrder);

// GET /api/payments (admin only)
router.get('/', getAllPayments);

export default router;