import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaBus, FaTrain, FaShip, FaPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['vendorTickets', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/vendor/tickets/${user.email}`);
      return data;
    },
  });

  const deleteTicketMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/api/vendor/tickets/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Ticket deleted successfully!');
      queryClient.invalidateQueries(['vendorTickets']);
    },
  });

  const handleDelete = (id, status) => {
    if (status === 'rejected') {
      toast.error('Cannot delete rejected tickets!');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTicketMutation.mutate(id);
      }
    });
  };

  const transportIcons = {
    Bus: FaBus,
    Train: FaTrain,
    Launch: FaShip,
    Plane: FaPlane,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

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
          My Added Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your ticket listings
        </p>
      </motion.div>

      {tickets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Tickets Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding tickets to grow your business
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => {
            const TransportIcon = transportIcons[ticket.transportType] || FaBus;
            const isDisabled = ticket.verificationStatus === 'rejected';

            return (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={ticket.image || 'https://via.placeholder.com/400x300'}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusColor(ticket.verificationStatus)}`}>
                      {ticket.verificationStatus}
                    </span>
                  </div>

                  {/* Transport Icon */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-dark-900/90 p-2 rounded-lg">
                    <TransportIcon className="text-xl text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {ticket.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {ticket.from} → {ticket.to}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-bold text-primary-600">৳{ticket.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Quantity</p>
                      <p className="font-bold text-gray-900 dark:text-white">{ticket.ticketQuantity}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      disabled={isDisabled}
                      className="flex-1 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FaEdit />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(ticket._id, ticket.verificationStatus)}
                      disabled={isDisabled}
                      className="flex-1 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;