import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCreditCard } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ booking, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const paymentMutation = useMutation({
    mutationFn: async (paymentData) => {
      const { data } = await axiosSecure.post('/api/payments', paymentData);
      return data;
    },
    onSuccess: () => {
      toast.success('Payment successful!');
      queryClient.invalidateQueries(['myBookings']);
      queryClient.invalidateQueries(['transactions']);
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const { data } = await axiosSecure.post('/api/create-payment-intent', {
        amount: booking.totalPrice,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'anonymous@example.com',
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Save payment to database
        const paymentData = {
          bookingId: booking._id,
          transactionId: paymentIntent.id,
          amount: booking.totalPrice,
          ticketTitle: booking.ticketTitle,
          userEmail: user.email,
          userName: user.displayName,
          paymentDate: new Date(),
        };

        paymentMutation.mutate(paymentData);
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed!');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Booking Info */}
      <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {booking.ticketTitle}
        </h4>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Quantity: {booking.bookingQuantity}</span>
          <span>Unit Price: ৳{booking.unitPrice}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-600 flex justify-between items-center">
          <span className="font-medium text-gray-900 dark:text-white">Total Amount</span>
          <span className="text-2xl font-bold text-primary-600">
            ৳{booking.totalPrice}
          </span>
        </div>
      </div>

      {/* Card Element */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <FaCreditCard className="inline mr-2" />
          Card Details
        </label>
        <div className="p-4 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1f2937',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-dark-600 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay ৳${booking.totalPrice}`}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ booking, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Complete Payment</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Stripe Elements */}
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} onClose={onClose} />
          </Elements>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;