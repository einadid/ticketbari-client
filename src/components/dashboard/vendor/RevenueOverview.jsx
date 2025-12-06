import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaDollarSign, FaTicketAlt, FaChartLine } from 'react-icons/fa';

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['vendorRevenue', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/vendor/revenue/${user.email}`);
      return data;
    },
  });

  const COLORS = ['#0ea5e9', '#d946ef', '#f97316', '#10b981'];

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 30000 },
  ];

  const pieData = [
    { name: 'Bus', value: 400 },
    { name: 'Train', value: 300 },
    { name: 'Launch', value: 200 },
    { name: 'Plane', value: 100 },
  ];

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
          Revenue Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your business performance
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
          <FaDollarSign className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Total Revenue</p>
          <p className="text-4xl font-bold">৳{stats?.totalRevenue || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
        >
          <FaTicketAlt className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Tickets Sold</p>
          <p className="text-4xl font-bold">{stats?.totalTicketsSold || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
        >
          <FaChartLine className="text-4xl mb-3 opacity-80" />
          <p className="text-white/80 text-sm mb-1">Total Tickets</p>
          <p className="text-4xl font-bold">{stats?.totalTicketsAdded || 0}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Sales by Transport Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenueOverview;