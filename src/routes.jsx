import App from './App';
import Medics from './pages/Medics';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const isAuthenticated = () => {
  return !!localStorage.getItem('token') ? true : false;
};

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/medics',
    element: <Medics />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/patients',
    element: <Patients />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/appointments',
    element: <Appointments />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
