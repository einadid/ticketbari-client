import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaTrain, FaShip, FaPlane, FaMapMarkerAlt, FaClock, FaTicketAlt, FaStar } from 'react-icons/fa';

const TicketCard = ({ ticket, featured = false }) => {
  const transportIcons = {
    Bus: FaBus,
    Train: FaTrain,
    Launch: FaShip,
    Plane: FaPlane,
  };

  const TransportIcon = transportIcons[ticket.transportType] || FaBus;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        featured ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
          <FaStar className="text-white text-sm" />
          <span className="text-white text-xs font-bold">FEATURED</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image || 'https://via.placeholder.com/400x300'}
          alt={ticket.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Transport Type Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm rounded-full">
          <TransportIcon className="text-primary-600" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {ticket.transportType}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-primary-600 rounded-xl">
          <p className="text-white text-sm">Starting from</p>
          <p className="text-white text-2xl font-bold">৳{ticket.price}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">
          {ticket.title}
        </h3>

        {/* Route */}
        <div className="flex items-center gap-3 mb-4 text-gray-600 dark:text-gray-400">
          <FaMapMarkerAlt className="text-primary-600 flex-shrink-0" />
          <span className="text-sm font-medium">
            {ticket.from} → {ticket.to}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaTicketAlt className="text-secondary-600" />
            <span>{ticket.ticketQuantity} seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaClock className="text-accent-600" />
            <span>{new Date(ticket.departureTime).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Perks */}
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {ticket.perks.slice(0, 3).map((perk, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {perk}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <Link
          to={`/ticket/${ticket._id}`}
          className="block w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

export default TicketCard;