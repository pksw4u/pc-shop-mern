import { Request, Response } from 'express';
import Payment from '../models/payment.model';
import Order from '../models/order.model';
import { razorpay, razorpayConfig } from '../config/razorpay';

interface AuthRequest extends Request {
  user?: any;
}

export const createPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId, gateway } = req.body;

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Check if payment already exists for this order
    const existingPayment = await Payment.findOne({ order: orderId });
    if (existingPayment) {
      res.status(400).json({ message: 'Payment already exists for this order' });
      return;
    }

    const payment = new Payment({
      order: orderId,
      amount: order.total,
      gateway,
    });

    await payment.save();
    await payment.populate('order');

    res.status(201).json(payment);
  } catch (error: any) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRazorpayOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    if (order.paymentMethod !== 'online') {
      res.status(400).json({ message: 'Order is not set for online payment' });
      return;
    }

    // Check if payment already exists for this order
    const existingPayment = await Payment.findOne({ order: orderId });
    if (existingPayment) {
      res.status(400).json({ message: 'Payment already exists for this order' });
      return;
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(order.total * 100), // Amount in paisa
      currency: razorpayConfig.currency,
      receipt: `receipt_${orderId}`,
      payment_capture: 1, // Auto capture
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create payment record
    const payment = new Payment({
      order: orderId,
      amount: order.total,
      gateway: 'razorpay',
      transactionId: razorpayOrder.id,
    });

    await payment.save();

    res.status(201).json({
      order: razorpayOrder,
      paymentId: payment._id,
      key: razorpayConfig.key_id,
    });
  } catch (error: any) {
    console.error('Create Razorpay order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const processPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId).populate('order');
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    // Check if user owns the order or is admin
    const order = payment.order as any;
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    if (payment.status !== 'pending') {
      res.status(400).json({ message: 'Payment is not in pending status' });
      return;
    }

    // Mock payment processing
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      payment.status = 'completed';
      payment.transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Update order status
      await Order.findByIdAndUpdate(order._id, { status: 'confirmed' });
    } else {
      payment.status = 'failed';
    }

    await payment.save();
    await payment.populate('order');

    res.json({
      success,
      payment,
      message: success ? 'Payment processed successfully' : 'Payment failed',
    });
  } catch (error: any) {
    console.error('Process payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyRazorpayPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = require('crypto')
      .createHmac('sha256', razorpayConfig.key_secret)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      res.status(400).json({ message: 'Payment verification failed' });
      return;
    }

    // Find payment by transaction ID
    const payment = await Payment.findOne({ transactionId: razorpay_order_id });
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    // Check if user owns the order
    const order = await Order.findById(payment.order);
    if (!order || (order.user.toString() !== req.user.id && req.user.role !== 'admin')) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Update payment status
    payment.status = 'completed';
    payment.transactionId = razorpay_payment_id;
    await payment.save();

    // Update order status
    await Order.findByIdAndUpdate(order._id, { status: 'confirmed' });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      payment,
    });
  } catch (error: any) {
    console.error('Verify Razorpay payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const razorpayWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const secret = razorpayConfig.key_secret;
    const expectedSignature = require('crypto')
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    const razorpaySignature = req.headers['x-razorpay-signature'] as string;

    if (expectedSignature !== razorpaySignature) {
      res.status(400).json({ message: 'Invalid signature' });
      return;
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
      // Find payment by transaction ID
      const payment = await Payment.findOne({ transactionId: paymentEntity.id });
      if (payment && payment.status !== 'completed') {
        payment.status = 'completed';
        await payment.save();

        // Update order status
        await Order.findByIdAndUpdate(payment.order, { status: 'confirmed' });
      }
    }

    res.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Razorpay webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPaymentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate('order');
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    // Check if user owns the order or is admin
    const order = payment.order as any;
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.json(payment);
  } catch (error: any) {
    console.error('Get payment by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPaymentsByOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const payments = await Payment.find({ order: orderId }).sort({ createdAt: -1 });

    res.json(payments);
  } catch (error: any) {
    console.error('Get payments by order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPayments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const { page = 1, limit = 10, status } = req.query;
    const query: any = {};
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .populate('order')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments(query);

    res.json({
      payments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error('Get all payments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};