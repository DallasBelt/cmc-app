import { Navigate } from 'react-router-dom';
import { AdminDashboard } from '@/components/admin';
// import { MedicDashboard } from '@/components/medic';
// import { AssistantDashboard } from '@/components/assistant';

export const Index = () => {
  const role = sessionStorage.getItem('role');

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'medic':
      // return <MedicDashboard />;
      return <div>Medic Dashboard</div>;
    case 'assistant':
      // return <AssistantDashboard />;
      return <div>Assistant Dashboard</div>;
    default:
      return <Navigate to='/unauthorized' replace />;
  }
};
