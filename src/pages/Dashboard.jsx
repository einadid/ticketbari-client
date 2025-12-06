import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import Loading from '../components/shared/Loading';

const Dashboard = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  // Redirect based on role
  if (role === 'admin') {
    return <Navigate to="/dashboard/admin-profile" replace />;
  } else if (role === 'vendor') {
    return <Navigate to="/dashboard/vendor-profile" replace />;
  } else {
    return <Navigate to="/dashboard/user-profile" replace />;
  }
};

export default Dashboard;