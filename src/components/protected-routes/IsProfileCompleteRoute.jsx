import { Navigate } from 'react-router-dom';

import { useUserInfo, useMedicInfo, useSchedule } from '@/hooks';
import { useToastStore } from '@/store';

import { Loader2 } from 'lucide-react';

export const IsProfileCompleteRoute = ({ children }) => {
  const role = sessionStorage.getItem('role');
  const setToast = useToastStore((state) => state.setToast);

  const { userInfoQuery } = useUserInfo();
  const { medicInfoQuery } = useMedicInfo();
  const { scheduleQuery } = useSchedule();

  const isLoading =
    userInfoQuery.isLoading ||
    medicInfoQuery.isLoading ||
    scheduleQuery.isLoading;

  if (role === 'admin') return children;

  // Esperar a que se carguen los datos
  if (isLoading) {
    return <Loader2 className='me-2 animate-spin' />;
  }

  const isProfileComplete =
    !!userInfoQuery.data &&
    !!medicInfoQuery.data &&
    !!scheduleQuery.data?.length;

  if (!isProfileComplete) {
    setToast(true, 'Debe completar sus datos antes de usar la aplicación.');
    return <Navigate to='/complete-profile' replace />;
  }

  return children;
};
