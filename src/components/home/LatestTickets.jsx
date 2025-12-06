import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TicketCard from '../tickets/TicketCard';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';

const LatestTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['latestTickets'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tickets/latest`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-full mb-4">
            <FaClock className="text-secondary-600 dark:text-secondary-400" />
            <span className="text-secondary-700 dark:text-secondary-300 font-semibold">
              Recently Added
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Available Tickets
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Fresh routes and newly added tickets for your next journey
          </p>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TicketCard ticket={ticket} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;