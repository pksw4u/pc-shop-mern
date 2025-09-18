import api from './api';

export interface CreateOrderData {
  products: Array<{
    product: string;
    quantity: number;
    options?: { [key: string]: string };
  }>;
  shippingAddress: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  paymentMethod: 'online' | 'cod';
}

export interface RazorpayOrderResponse {
  order: any;
  paymentId: string;
  key: string;
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const paymentService = {
  // Create order
  createOrder: async (orderData: CreateOrderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Create Razorpay order
  createRazorpayOrder: async (orderId: string): Promise<RazorpayOrderResponse> => {
    const response = await api.post('/payments/razorpay/order', { orderId });
    return response.data;
  },

  // Verify Razorpay payment
  verifyRazorpayPayment: async (verificationData: PaymentVerificationData) => {
    const response = await api.post('/payments/razorpay/verify', verificationData);
    return response.data;
  },
};