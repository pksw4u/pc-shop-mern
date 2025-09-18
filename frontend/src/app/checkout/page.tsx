'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button, Input } from '../../components';
import { RootState } from '../../store/store';
import { clearCart } from '../../store/slices/cartSlice';
import { paymentService } from '../../services';
import { formatPrice } from '../../utils/price';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const tax = total * 0.08;
  const shipping = total > 50 ? 0 : 9.99;
  const finalTotal = total + tax + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!orderId) {
      await createOrder();
    } else if (paymentMethod === 'online') {
      await initiatePayment();
    } else {
      // COD order is already created
      dispatch(clearCart());
      setCurrentStep(4);
    }
  };

  const createOrder = async () => {
    try {
      setIsProcessing(true);
      const orderData = {
        products: items.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
          options: item.selectedOptions || {},
        })),
        shippingAddress: {
          street: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}`,
          city: shippingInfo.city,
          zip: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        paymentMethod,
      };

      const order = await paymentService.createOrder(orderData);
      setOrderId(order._id);

      if (paymentMethod === 'cod') {
        dispatch(clearCart());
        setCurrentStep(4);
      } else {
        await initiatePayment();
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const initiatePayment = async () => {
    if (!orderId || !razorpayLoaded) return;

    try {
      setIsProcessing(true);
      const razorpayOrder = await paymentService.createRazorpayOrder(orderId);

      const options = {
        key: razorpayOrder.key,
        amount: razorpayOrder.order.amount,
        currency: razorpayOrder.order.currency,
        name: 'Computer Shop',
        description: 'Purchase from Computer Shop',
        order_id: razorpayOrder.order.id,
        handler: async (response: any) => {
          try {
            await paymentService.verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            dispatch(clearCart());
            setCurrentStep(4);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 1, name: 'Shipping', completed: currentStep > 1 },
    { id: 2, name: 'Payment Method', completed: currentStep > 2 },
    { id: 3, name: 'Review', completed: currentStep > 3 },
    { id: 4, name: 'Confirmation', completed: currentStep > 4 },
  ];

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.completed ? '✓' : step.id}
                </div>
                <span className={`ml-2 ${currentStep === step.id ? 'font-semibold' : ''}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={shippingInfo.firstName}
                      onChange={(value) => setShippingInfo({ ...shippingInfo, firstName: value })}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={shippingInfo.lastName}
                      onChange={(value) => setShippingInfo({ ...shippingInfo, lastName: value })}
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    label="Email"
                    value={shippingInfo.email}
                    onChange={(value) => setShippingInfo({ ...shippingInfo, email: value })}
                    required
                  />
                  <Input
                    type="tel"
                    label="Phone"
                    value={shippingInfo.phone}
                    onChange={(value) => setShippingInfo({ ...shippingInfo, phone: value })}
                    required
                  />
                  <Input
                    label="Address"
                    value={shippingInfo.address}
                    onChange={(value) => setShippingInfo({ ...shippingInfo, address: value })}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={shippingInfo.city}
                      onChange={(value) => setShippingInfo({ ...shippingInfo, city: value })}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingInfo.state}
                      onChange={(value) => setShippingInfo({ ...shippingInfo, state: value })}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={shippingInfo.zipCode}
                      onChange={(value) => setShippingInfo({ ...shippingInfo, zipCode: value })}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                <form onSubmit={handlePaymentMethodSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="online"
                        name="paymentMethod"
                        type="radio"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cod')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <span>Online Payment (Razorpay)</span>
                          <span className="ml-2 text-xs text-gray-500">Pay securely with credit/debit card, UPI, net banking</span>
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="cod"
                        name="paymentMethod"
                        type="radio"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cod')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <span>Cash on Delivery (COD)</span>
                          <span className="ml-2 text-xs text-gray-500">Pay when you receive your order</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Review Your Order</h2>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                  <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  <p>{shippingInfo.email}</p>
                  <p>{shippingInfo.phone}</p>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  <p className="capitalize">{paymentMethod === 'online' ? 'Online Payment (Razorpay)' : 'Cash on Delivery'}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    size="lg"
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-white border rounded-lg p-6 text-center">
                <div className="mb-6">
                  <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. You'll receive a confirmation email shortly.
                </p>
                <Button size="lg">
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                 <div className="flex justify-between">
                   <span>Subtotal:</span>
                   <span>{formatPrice(total)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Shipping:</span>
                   <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Tax:</span>
                   <span>{formatPrice(tax)}</span>
                 </div>
               </div>

               <hr className="my-4" />

               <div className="flex justify-between text-xl font-semibold">
                 <span>Total:</span>
                 <span>{formatPrice(finalTotal)}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}