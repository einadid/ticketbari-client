import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaDollarSign } from 'react-icons/fa';
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import Countdown from '../../tickets/Countdown';

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['myBookings', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/bookings/user/${user.email}`);
      return data;
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handlePayNow = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Booked Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your ticket bookings
        </p>
      </motion.div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start booking your journey today!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => {
            const isPastDeparture = new Date(booking.departureTime) < new Date();
            const canPay = booking.status === 'accepted' && !isPastDeparture;

            return (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={booking.ticketImage || 'https://via.placeholder.com/400x300'}
                    alt={booking.ticketTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg line-clamp-1">
                      {booking.ticketTitle}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Route */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <FaMapMarkerAlt className="text-primary-600" />
                    <span className="text-sm font-medium">
                      {booking.from} → {booking.to}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Quantity</p>
                      <div className="flex items-center gap-2">
                        <FaTicketAlt className="text-secondary-600" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {booking.bookingQuantity}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Price</p>
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-green-600" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          ৳{booking.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Departure */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <FaClock className="text-accent-600" />
                    <span className="text-sm">
                      {new Date(booking.departureTime).toLocaleString()}
                    </span>
                  </div>

                  {/* Countdown */}
                  {booking.status !== 'rejected' && !isPastDeparture && (
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 mb-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Departure in:</p>
                      <Countdown targetDate={new Date(booking.departureTime)} />
                    </div>
                  )}

                  {/* Pay Button */}
                  {canPay && (
                    <button
                      onClick={() => handlePayNow(booking)}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Pay Now
                    </button>
                  )}

                  {isPastDeparture && booking.status === 'accepted' && (
                    <div className="w-full py-3 bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 rounded-xl font-semibold text-center">
                      Expired
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default MyBookedTickets;