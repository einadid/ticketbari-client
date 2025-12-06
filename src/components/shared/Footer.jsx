import { Link } from 'react-router-dom';
import { FaBus, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { SiStripe, SiVisa, SiMastercard } from 'react-icons/si';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/all-tickets', label: 'All Tickets' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/about', label: 'About' }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', color: 'hover:text-blue-500' },
    { icon: FaTwitter, url: '#', color: 'hover:text-sky-400' },
    { icon: FaInstagram, url: '#', color: 'hover:text-pink-500' }
  ];

  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl">
                <FaBus className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">TicketBari</h1>
                <p className="text-sm text-gray-400">Book Your Journey</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Book bus, train, launch & flight tickets easily. Your trusted travel companion for seamless journey planning.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-500 group-hover:w-4 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <FaEnvelope className="text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:support@ticketbari.com" className="hover:text-primary-400 transition-colors">
                    support@ticketbari.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaPhone className="text-secondary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:+8801234567890" className="hover:text-primary-400 transition-colors">
                    +880 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Payment Methods
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
            </h3>
            <p className="text-gray-400 mb-4">We accept secure payments via:</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-dark-700 px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-dark-600 transition-colors">
                <SiStripe className="text-2xl text-purple-500" />
                <span className="text-sm font-medium">Stripe</span>
              </div>
              <div className="bg-dark-700 px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-dark-600 transition-colors">
                <SiVisa className="text-2xl text-blue-500" />
                <span className="text-sm font-medium">Visa</span>
              </div>
              <div className="bg-dark-700 px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-dark-600 transition-colors">
                <SiMastercard className="text-2xl text-red-500" />
                <span className="text-sm font-medium">Mastercard</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} TicketBari. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="hover:text-primary-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;