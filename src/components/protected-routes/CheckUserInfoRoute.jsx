import { Navigate } from 'react-router-dom';
import { useToastStore } from '@/store';

export const CheckUserInfoRoute = ({ children }) => {
  const isInfoComplete = sessionStorage.getItem('isInfoComplete');
  console.log(isInfoComplete);
  const setToast = useToastStore((state) => state.setToast);

  if (!isInfoComplete) {
    setToast(true, 'Debe completar sus datos antes de usar la aplicación.');
    return <Navigate to='/complete-info' replace />;
  }

  return children;
};
