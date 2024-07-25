import Root from './pages/Root';
import Index from './pages/Index';
import Users from './pages/Users';
import Medics from './pages/Medics';
import Assistants from './pages/Assistants';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import LoginPage from './pages/Login';
import CompleteRegistration from './pages/CompleteRegistration';
import ErrorPage from './pages/NotFound';
import ForgotPasswordPage from './pages/ForgotPassword';
import { PrivateRoute, PublicRoute } from './components/ProtectedRoutes';

const routes = [
  {
    path: '/super',
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: 'users',
        element: <Users />,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: 'medics',
        element: <Medics />,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  {
    path: '/medic',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: 'assistants',
        element: <Assistants />,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: 'patients',
        element: <Patients />,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: 'appointments',
        element: <Appointments />,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  {
    path: '/complete-registration',
    element: (
      <PrivateRoute>
        <CompleteRegistration />
      </PrivateRoute>
    ),
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    errorElement: <div>Oops! There was an error.</div>,
  },
];

export default routes;
