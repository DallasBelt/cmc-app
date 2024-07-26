import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to='/login' replace />;
};

export const AdminRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');
  return token && roles.includes('admin') ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export const MedicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');
  return token && roles.includes('medic') ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to='/super' replace /> : children;
};
