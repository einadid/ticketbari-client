import { motion } from 'framer-motion';
import { FaArrowRight, FaBus, FaTrain } from 'react-icons/fa';

const PopularRoutes = () => {
  const routes = [
    {
      id: 1,
      from: 'Dhaka',
      to: 'Chittagong',
      image: 'https://images.unsplash.com/photo-1589307357838-99c67371e6ed?w=800&q=80',
      trips: 45,
      startPrice: 850,
      type: 'Bus',
      icon: FaBus,
    },
    {
      id: 2,
      from: 'Dhaka',
      to: 'Sylhet',
      image: 'https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?w=800&q=80',
      trips: 32,
      startPrice: 720,
      type: 'Train',
      icon: FaTrain,
    },
    {
      id: 3,
      from: 'Dhaka',
      to: 'Cox\'s Bazar',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      trips: 28,
      startPrice: 1200,
      type: 'Bus',
      icon: FaBus,
    },
    {
      id: 4,
      from: 'Chittagong',
      to: 'Sylhet',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      trips: 18,
      startPrice: 950,
      type: 'Bus',
      icon: FaBus,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Routes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Most traveled destinations with the best connections
          </p>
        </motion.div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-dark-900/90 rounded-full">
                    <route.icon className="text-primary-600" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {route.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Route */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {route.from}
                    </span>
                    <FaArrowRight className="text-primary-600 dark:text-primary-400" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {route.to}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{route.trips} trips/day</span>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      From ৳{route.startPrice}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;