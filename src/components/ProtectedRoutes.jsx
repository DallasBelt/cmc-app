import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to='/login' replace />;
};

export const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to='/' replace /> : children;
};

export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};
