import { PatientsByMonthChart, UsersByMonthChart } from '@/components/charts';

export const Reports = () => {
  const role = sessionStorage.getItem('role');
  switch (role) {
    case 'admin':
      return <UsersByMonthChart />;
    case 'medic':
      return <PatientsByMonthChart />;
  }
};
