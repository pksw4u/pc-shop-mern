import { Request, Response } from 'express';
import Order from '../models/order.model';
import Product from '../models/product.model';

interface AuthRequest extends Request {
  user?: any;
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    // Calculate total and validate products
    let total = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ message: `Product ${item.product} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        return;
      }

      total += product.price * item.quantity;
      orderProducts.push({
        product: item.product,
        quantity: item.quantity,
        options: item.options || {},
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: userId,
      products: orderProducts,
      total,
      shippingAddress,
      paymentMethod: paymentMethod || 'online',
    });

    await order.save();
    await order.populate([
      { path: 'user', select: 'name email' },
      { path: 'products.product', select: 'name price' },
    ]);

    res.status(201).json(order);
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate('products.product', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const { page = 1, limit = 10, status } = req.query;
    const query: any = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('products.product', 'name price')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('products.product', 'name price');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Check if user owns the order or is admin
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.json(order);
  } catch (error: any) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('user', 'name email')
      .populate('products.product', 'name price');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error: any) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Check if user owns the order or is admin
    if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Only allow cancellation if order is pending or confirmed
    if (!['pending', 'confirmed'].includes(order.status)) {
      res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
      return;
    }

    // Restore stock
    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = 'cancelled';
    await order.save();
    await order.populate('products.product', 'name price');

    res.json(order);
  } catch (error: any) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};