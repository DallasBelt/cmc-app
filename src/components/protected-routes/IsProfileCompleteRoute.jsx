import { Navigate } from 'react-router-dom';

import { useMedicInfo, useUserInfo } from '@/hooks';
import { useToastStore } from '@/store';

export const IsProfileCompleteRoute = ({ children }) => {
  const role = sessionStorage.getItem('roles');
  const setToast = useToastStore((state) => state.setToast);
  const { userInfoQuery } = useUserInfo();
  const { medicInfoQuery } = useMedicInfo();

  if (role === 'admin') {
    return children;
  }

  const isUserInfoComplete = userInfoQuery.data;
  const isMedicInfoComplete = medicInfoQuery.data;
  const isScheduleComplete = medicInfoQuery.data?.schedule?.length > 0;

  if (!isUserInfoComplete || !isMedicInfoComplete || !isScheduleComplete) {
    setToast(true, 'Debe completar sus datos antes de usar la aplicación.');
    return <Navigate to='/complete-profile' replace />;
  }

  return children;
};
