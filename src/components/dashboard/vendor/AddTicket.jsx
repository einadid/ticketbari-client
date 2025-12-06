import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlus, FaImage } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { uploadImage } from '../../../utils/uploadImage';
import toast from 'react-hot-toast';

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addTicketMutation = useMutation({
    mutationFn: async (ticketData) => {
      const { data } = await axiosSecure.post('/api/vendor/tickets', ticketData);
      return data;
    },
    onSuccess: () => {
      toast.success('Ticket added successfully! Waiting for admin approval.');
      queryClient.invalidateQueries(['vendorTickets']);
      reset();
      setImagePreview(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add ticket!');
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload image
      let imageUrl = '';
      if (data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      // Prepare ticket data
      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: parseFloat(data.price),
        ticketQuantity: parseInt(data.ticketQuantity),
        departureTime: new Date(data.departureTime).toISOString(),
        perks: data.perks || [],
        image: imageUrl,
        vendorName: user.displayName,
        vendorEmail: user.email,
      };

      addTicketMutation.mutate(ticketData);
    } catch (error) {
      toast.error('Image upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const perkOptions = ['AC', 'WiFi', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Entertainment', 'Charging Port'];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Ticket
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new ticket listing for travelers
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
              placeholder="e.g., Dhaka to Chittagong AC Bus"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* From & To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From (Location) *
              </label>
              <input
                type="text"
                {...register('from', { required: 'From location is required' })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
                placeholder="e.g., Dhaka"
              />
              {errors.from && (
                <p className="mt-1 text-sm text-red-500">{errors.from.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To (Location) *
              </label>
              <input
                type="text"
                {...register('to', { required: 'To location is required' })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
                placeholder="e.g., Chittagong"
              />
              {errors.to && (
                <p className="mt-1 text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>
          </div>

          {/* Transport Type & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transport Type *
              </label>
              <select
                {...register('transportType', { required: 'Transport type is required' })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
              >
                <option value="">Select Type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>
              {errors.transportType && (
                <p className="mt-1 text-sm text-red-500">{errors.transportType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (Per Unit) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required', min: 1 })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
                placeholder="e.g., 850"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Ticket Quantity & Departure Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Quantity *
              </label>
              <input
                type="number"
                {...register('ticketQuantity', { required: 'Quantity is required', min: 1 })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
                placeholder="e.g., 40"
              />
              {errors.ticketQuantity && (
                <p className="mt-1 text-sm text-red-500">{errors.ticketQuantity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Date & Time *
              </label>
              <input
                type="datetime-local"
                {...register('departureTime', { required: 'Departure time is required' })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white"
              />
              {errors.departureTime && (
                <p className="mt-1 text-sm text-red-500">{errors.departureTime.message}</p>
              )}
            </div>
          </div>

          {/* Perks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Perks & Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {perkOptions.map((perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={perk}
                    {...register('perks')}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{perk}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaImage className="inline mr-2" />
              Ticket Image *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: 'Image is required' })}
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
            )}
            
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          {/* Vendor Info (Readonly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || addTicketMutation.isPending}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading || addTicketMutation.isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {uploading ? 'Uploading...' : 'Adding Ticket...'}
              </>
            ) : (
              <>
                <FaPlus />
                Add Ticket
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTicket;