import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBus, FaTrain, FaShip, FaPlane, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUser, FaCheckCircle } from 'react-icons/fa';
import BookingModal from '../components/tickets/BookingModal';
import Countdown from '../components/tickets/Countdown';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticketDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tickets/${id}`
      );
      return data;
    },
  });

  const transportIcons = {
    Bus: FaBus,
    Train: FaTrain,
    Launch: FaShip,
    Plane: FaPlane,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ticket Not Found
          </h2>
        </div>
      </div>
    );
  }

  const TransportIcon = transportIcons[ticket.transportType] || FaBus;
  const departureDate = new Date(ticket.departureTime);
  const isPastDeparture = departureDate < new Date();
  const isOutOfStock = ticket.ticketQuantity === 0;

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          
          {/* Image Section */}
          <div className="relative h-96">
            <img
              src={ticket.image || 'https://via.placeholder.com/1200x400'}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Transport Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm rounded-full">
              <TransportIcon className="text-2xl text-primary-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {ticket.transportType}
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {ticket.title}
              </h1>
              <div className="flex items-center gap-3 text-white/90">
                <FaMapMarkerAlt />
                <span className="text-xl font-medium">
                  {ticket.from} → {ticket.to}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                    <FaTicketAlt className="text-2xl text-primary-600 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {ticket.ticketQuantity}
                    </p>
                  </div>

                  <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-xl p-4">
                    <FaClock className="text-2xl text-secondary-600 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Departure</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {departureDate.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4">
                    <FaUser className="text-2xl text-accent-600 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Vendor</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {ticket.vendorName}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ৳{ticket.price}
                    </p>
                    <p className="text-xs text-gray-500">per seat</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Journey Details
                  </h2>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                        <p className="font-semibold text-lg">{ticket.from}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                        <p className="font-semibold text-lg">{ticket.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Departure Date</p>
                        <p className="font-semibold">{departureDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Departure Time</p>
                        <p className="font-semibold">{departureDate.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perks */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Amenities & Perks
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ticket.perks.map((perk, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-xl"
                        >
                          <FaCheckCircle className="text-green-600 dark:text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {perk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vendor Info */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Vendor Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Name:</span> {ticket.vendorName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Email:</span> {ticket.vendorEmail}
                  </p>
                </div>
              </div>

              {/* Right Column - Booking */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
                  
                  {/* Countdown */}
                  {!isPastDeparture && (
                    <div className="mb-6">
                      <p className="text-white/80 text-sm mb-2">Departure in:</p>
                      <Countdown targetDate={departureDate} />
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/20">
                    <p className="text-white/80 text-sm mb-1">Price per ticket</p>
                    <p className="text-4xl font-bold">৳{ticket.price}</p>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80 text-sm">Available Seats</span>
                      <span className="font-bold text-lg">{ticket.ticketQuantity}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${Math.min((ticket.ticketQuantity / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={isPastDeparture || isOutOfStock}
                    className="w-full py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPastDeparture
                      ? 'Departure Passed'
                      : isOutOfStock
                      ? 'Out of Stock'
                      : 'Book Now'}
                  </button>

                  {isPastDeparture && (
                    <p className="text-white/70 text-sm mt-3 text-center">
                      This journey has already departed
                    </p>
                  )}

                  {isOutOfStock && !isPastDeparture && (
                    <p className="text-white/70 text-sm mt-3 text-center">
                      No seats available for this journey
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          ticket={ticket}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default TicketDetailsPage;