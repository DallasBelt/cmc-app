import { Navigate } from 'react-router-dom';

export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};
