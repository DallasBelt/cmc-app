import { useEffect } from 'react';
import { toast } from 'sonner';

import { Scheduler } from '@/components';
import { useToastStore } from '@/store/store';

const chartConfig = {
  patients: {
    label: 'Pacientes',
    color: '#2563eb',
  },
  appointments: {
    label: 'Citas',
    color: '#60a5fa',
  },
};

const chartData = [
  { month: 'Enero', patients: 186, appointments: 80 },
  { month: 'Febrero', patients: 305, appointments: 200 },
  { month: 'Marzo', patients: 237, appointments: 120 },
  { month: 'Abril', patients: 73, appointments: 190 },
  { month: 'Mayo', patients: 209, appointments: 130 },
  { month: 'Junio', patients: 214, appointments: 140 },
];

export const Index = () => {
  const showToast = useToastStore((state) => state.showToast);
  const toastMessage = useToastStore((state) => state.toastMessage);
  const setToast = useToastStore((state) => state.setToast);
  const isAdmin = sessionStorage.getItem('roles').includes('admin');
  const isAssistant = sessionStorage.getItem('roles').includes('assistant');

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage);
      setToast(false, '');
    }
  }, [showToast]);

  return (
    <div className={isAdmin ? 'hidden' : 'block'}>
      <Scheduler />
    </div>
  );
};
