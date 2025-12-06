import { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-dark-700 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-dark-900 shadow-lg flex items-center justify-center"
        animate={{ x: theme === 'dark' ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <FaMoon className="text-primary-500 text-sm" />
        ) : (
          <FaSun className="text-yellow-500 text-sm" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;