import { Navigate } from 'react-router-dom';

import { useUserInfo, useMedicInfo, useSchedule } from '@/hooks';
import { useToastStore } from '@/store';

export const IsProfileCompleteRoute = ({ children }) => {
  const role = sessionStorage.getItem('roles');
  const setToast = useToastStore((state) => state.setToast);

  const { userInfoQuery } = useUserInfo();
  const { medicInfoQuery } = useMedicInfo();
  const { scheduleQuery } = useSchedule();

  if (role === 'admin') {
    return children;
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
