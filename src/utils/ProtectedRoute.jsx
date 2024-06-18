import { Navigate } from 'react-router-dom';

import Root from '@/pages/Root';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Root /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
