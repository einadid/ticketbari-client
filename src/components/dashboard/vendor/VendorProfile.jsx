import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUserTag, FaCalendar, FaTicketAlt } from 'react-icons/fa';

const VendorProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: vendorProfile, isLoading } = useQuery({
    queryKey: ['vendorProfile', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/profile/${user.email}`);
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['vendorStats', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/vendor/revenue/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Vendor Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your vendor account
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white"
        >
          <FaTicketAlt className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">৳{stats?.totalRevenue || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
        >
          <FaTicketAlt className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Tickets Sold</p>
          <p className="text-3xl font-bold">{stats?.totalTicketsSold || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
        >
          <FaTicketAlt className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Total Tickets</p>
          <p className="text-3xl font-bold">{stats?.totalTicketsAdded || 0}</p>
        </motion.div>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>

        <div className="px-8 pb-8">
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt={user?.displayName}
                className="w-32 h-32 rounded-full ring-8 ring-white dark:ring-dark-800 object-cover"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-white dark:ring-dark-800"></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-primary-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white ml-13">
                {vendorProfile?.email}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                  <FaUserTag className="text-secondary-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white ml-13 capitalize">
                {vendorProfile?.role}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                  <FaCalendar className="text-accent-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vendor Since</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white ml-13">
                {new Date(vendorProfile?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaUserTag className="text-green-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white ml-13">
                {vendorProfile?.name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorProfile;