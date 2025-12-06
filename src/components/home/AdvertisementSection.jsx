import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TicketCard from '../tickets/TicketCard';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const AdvertisementSection = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['advertisedTickets'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tickets/advertised`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (tickets.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <FaStar className="text-yellow-500" />
            <span className="text-primary-700 dark:text-primary-300 font-semibold">
              Featured Tickets
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Special Offers Just for You
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Handpicked deals and exclusive routes recommended by our team
          </p>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TicketCard ticket={ticket} featured={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;