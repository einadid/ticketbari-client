import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaHeadset, FaDollarSign, FaClock, FaMobileAlt } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Secure Booking',
      description: 'Your payments are protected with industry-standard encryption',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaBolt,
      title: 'Instant Confirmation',
      description: 'Get your tickets confirmed instantly after successful payment',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Our support team is always ready to help you anytime',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: FaDollarSign,
      title: 'Best Prices',
      description: 'Compare prices and get the best deals on all routes',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaClock,
      title: 'Real-time Updates',
      description: 'Stay informed with live tracking and notifications',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Friendly',
      description: 'Book tickets on-the-go with our responsive platform',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose TicketBari?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We provide the best ticket booking experience with top-notch features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500`}></div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative z-10`}>
                  <feature.icon className="text-3xl text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;