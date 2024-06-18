import Index from './pages/Index';
import Medics from './pages/Medics';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import LoginPage from './pages/Login';
import ErrorPage from './pages/NotFound';
import ForgotPasswordPage from './pages/ForgotPassword';
import ProtectedRoute from './utils/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'medics',
        element: <Medics />,
      },
      {
        path: 'patients',
        element: <Patients />,
      },
      {
        path: 'appointments',
        element: <Appointments />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
];

export default routes;
