import { Navigate } from 'react-router-dom';
import { useToastStore } from '@/store';

export const IsProfileCompleteRoute = ({ children }) => {
  const role = sessionStorage.getItem('roles');
  const isProfileComplete = sessionStorage.getItem('isProfileComplete');
  const setToast = useToastStore((state) => state.setToast);

  if (role === 'admin') {
    return children;
  }

  if (isProfileComplete !== 'true') {
    setToast(true, 'Debe completar sus datos antes de usar la aplicación.');
    return <Navigate to='/complete-profile' replace />;
  }

  return children;
};
