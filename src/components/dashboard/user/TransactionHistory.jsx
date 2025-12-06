import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaReceipt, FaDownload } from 'react-icons/fa';

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/payments/user/${user.email}`);
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
          Transaction History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all your payment transactions
        </p>
      </motion.div>

      {transactions.length === 0 ? (
        <div className="text-center py-20">
          <FaReceipt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Transactions Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your payment history will appear here
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Ticket Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Payment Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">
                      {transaction.transactionId.slice(0, 20)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.ticketTitle}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                      ৳{transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(transaction.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        <FaDownload className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransactionHistory;