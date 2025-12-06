import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBus, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import ThemeToggle from '../ui/ThemeToggle';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    ...(user ? [
      { path: '/all-tickets', label: 'All Tickets' },
      { path: '/dashboard', label: 'Dashboard' }
    ] : [])
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl">
                <FaBus className="text-2xl text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TicketBari
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Book Your Journey</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full ring-2 ring-primary-500"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {role}
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-700 overflow-hidden"
                    >
                      <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500">
                        <p className="text-white font-semibold">{user.displayName}</p>
                        <p className="text-white/80 text-sm">{user.email}</p>
                      </div>
                      
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                        >
                          <MdDashboard className="text-xl text-primary-600" />
                          <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600"
                        >
                          <MdLogout className="text-xl" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:shadow-lg hover:scale-105 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-gray-700 dark:text-gray-300" />
            ) : (
              <FaBars className="text-2xl text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user ? (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full ring-2 ring-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-700 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-center font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-center font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:shadow-lg transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;