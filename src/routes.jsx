import Index from './pages/Index';
import Users from './pages/Users';
import Appointments from './pages/Appointments';
import LoginPage from './pages/Login';
import ErrorPage from './pages/NotFound';
import ForgotPasswordPage from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './pages/Root';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'users',
        element: <Users />,
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
