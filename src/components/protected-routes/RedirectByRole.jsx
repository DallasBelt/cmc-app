import { Navigate } from 'react-router-dom';

export const RedirectByRole = () => {
  const role = sessionStorage.getItem('role');

  switch (role) {
    case 'admin':
      return <Navigate to='/admin/dashboard' replace />;
    case 'medic':
      return <Navigate to='/medic/dashboard' replace />;
    case 'assistant':
      return <Navigate to='/assistant/dashboard' replace />;
    default:
      return <Navigate to='/unauthorized' replace />;
  }
};
