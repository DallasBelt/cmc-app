import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to='/' replace /> : children;
};
