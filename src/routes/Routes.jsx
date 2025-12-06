import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllTickets from '../pages/AllTickets';
import TicketDetailsPage from '../pages/TicketDetailsPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../components/shared/ErrorPage';

// User Dashboard Pages
import UserProfile from '../components/dashboard/user/UserProfile';
import MyBookedTickets from '../components/dashboard/user/MyBookedTickets';
import TransactionHistory from '../components/dashboard/user/TransactionHistory';

// Vendor Dashboard Pages
import VendorProfile from '../components/dashboard/vendor/VendorProfile';
import AddTicket from '../components/dashboard/vendor/AddTicket';
import MyAddedTickets from '../components/dashboard/vendor/MyAddedTickets';
import RequestedBookings from '../components/dashboard/vendor/RequestedBookings';
import RevenueOverview from '../components/dashboard/vendor/RevenueOverview';

// Admin Dashboard Pages
import AdminProfile from '../components/dashboard/admin/AdminProfile';
import ManageTickets from '../components/dashboard/admin/ManageTickets';
import ManageUsers from '../components/dashboard/admin/ManageUsers';
import AdvertiseTickets from '../components/dashboard/admin/AdvertiseTickets';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/all-tickets',
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: '/ticket/:id',
        element: (
          <PrivateRoute>
            <TicketDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // User Routes
      {
        path: 'user-profile',
        element: <UserProfile />,
      },
      {
        path: 'my-booked-tickets',
        element: <MyBookedTickets />,
      },
      {
        path: 'transaction-history',
        element: <TransactionHistory />,
      },
      // Vendor Routes
      {
        path: 'vendor-profile',
        element: <VendorProfile />,
      },
      {
        path: 'add-ticket',
        element: <AddTicket />,
      },
      {
        path: 'my-added-tickets',
        element: <MyAddedTickets />,
      },
      {
        path: 'requested-bookings',
        element: <RequestedBookings />,
      },
      {
        path: 'revenue-overview',
        element: <RevenueOverview />,
      },
      // Admin Routes
      {
        path: 'admin-profile',
        element: <AdminProfile />,
      },
      {
        path: 'manage-tickets',
        element: <ManageTickets />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
      },
      {
        path: 'advertise-tickets',
        element: <AdvertiseTickets />,
      },
    ],
  },
]);

export default router;