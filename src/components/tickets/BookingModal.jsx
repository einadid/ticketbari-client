import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTicketAlt } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const BookingModal = ({ ticket, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const bookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await axiosSecure.post('/api/bookings', bookingData);
      return data;
    },
    onSuccess: () => {
      toast.success('Booking request sent successfully!');
      queryClient.invalidateQueries(['myBookings']);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Booking failed!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quantity > ticket.ticketQuantity) {
      toast.error(`Only ${ticket.ticketQuantity} seats available!`);
      return;
    }

    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      ticketImage: ticket.image,
      from: ticket.from,
      to: ticket.to,
      departureTime: ticket.departureTime,
      unitPrice: ticket.price,
      bookingQuantity: quantity,
      totalPrice: ticket.price * quantity,
      userEmail: user.email,
      userName: user.displayName,
      vendorEmail: ticket.vendorEmail,
      vendorName: ticket.vendorName,
    };

    bookingMutation.mutate(bookingData);
  };

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
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold">Book Tickets</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-white/80">{ticket.title}</p>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Ticket Info */}
            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 dark:text-gray-400">Price per ticket</span>
                <span className="text-2xl font-bold text-primary-600">৳{ticket.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Available seats</span>
                <span className="font-bold text-gray-900 dark:text-white">{ticket.ticketQuantity}</span>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaTicketAlt className="inline mr-2" />
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                max={ticket.ticketQuantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white text-lg font-semibold text-center"
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Maximum {ticket.ticketQuantity} tickets can be booked
              </p>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Amount</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  ৳{ticket.price * quantity}
                </span>
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
                disabled={bookingMutation.isPending}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;