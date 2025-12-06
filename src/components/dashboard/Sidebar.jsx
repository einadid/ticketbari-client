import { NavLink } from 'react-router-dom';
import { FaUser, FaTicketAlt, FaHistory, FaPlus, FaClipboardList, FaChartLine, FaUsers, FaBullhorn, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ onClose }) => {
  const { role } = useRole();
  const { user } = useAuth();

  const userRoutes = [
    { path: '/dashboard/user-profile', label: 'My Profile', icon: FaUser },
    { path: '/dashboard/my-booked-tickets', label: 'My Booked Tickets', icon: FaTicketAlt },
    { path: '/dashboard/transaction-history', label: 'Transaction History', icon: FaHistory },
  ];

  const vendorRoutes = [
    { path: '/dashboard/vendor-profile', label: 'Vendor Profile', icon: FaUser },
    { path: '/dashboard/add-ticket', label: 'Add Ticket', icon: FaPlus },
    { path: '/dashboard/my-added-tickets', label: 'My Added Tickets', icon: FaTicketAlt },
    { path: '/dashboard/requested-bookings', label: 'Requested Bookings', icon: FaClipboardList },
    { path: '/dashboard/revenue-overview', label: 'Revenue Overview', icon: FaChartLine },
  ];

  const adminRoutes = [
    { path: '/dashboard/admin-profile', label: 'Admin Profile', icon: FaUser },
    { path: '/dashboard/manage-tickets', label: 'Manage Tickets', icon: FaTicketAlt },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: FaUsers },
    { path: '/dashboard/advertise-tickets', label: 'Advertise Tickets', icon: FaBullhorn },
  ];

  const routes =
    role === 'admin'
      ? adminRoutes
      : role === 'vendor'
      ? vendorRoutes
      : userRoutes;

  return (
    <div className="h-full flex flex-col">
      {/* Close Button (Mobile) */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <FaTimes className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/60'}
            alt={user?.displayName}
            className="w-16 h-16 rounded-full ring-4 ring-primary-500"
          />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
              {user?.displayName}
            </h3>
            <span className="inline-block px-3 py-1 mt-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            to={route.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <route.icon className={`text-xl ${isActive ? 'text-white' : 'text-primary-600'}`} />
                <span>{route.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-dark-700">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Need help?
          </p>
          <a
            href="mailto:support@ticketbari.com"
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;