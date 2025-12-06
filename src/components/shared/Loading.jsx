import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl mb-6"
        >
          <FaBus className="text-5xl text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Loading...
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your journey
        </p>
        
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-primary-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;