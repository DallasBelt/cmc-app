import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useToastStore } from '@/store';

import { AdminDashboard } from '@/components/admin';
import { MedicDashboard } from '@/components/medic';
// import { AssistantDashboard } from '@/components/assistant';

export const Index = () => {
  const role = sessionStorage.getItem('role');
  const { setToast, showToast, toastMessage } = useToastStore((state) => state);

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage);
      setToast(false, '');
    }
  }, [showToast]);

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'medic':
      return <MedicDashboard />;
    case 'assistant':
      return <MedicDashboard />;
    default:
      return <Navigate to='/unauthorized' replace />;
  }
};
