import Root from './pages/Root';
import Index from './pages/Index';
import Users from './pages/Users';
import Assistants from './pages/Assistants';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
// import CompleteRegistration from './pages/CompleteRegistration';

import {
  PrivateRoute,
  PublicRoute,
  RoleBasedRoute,
} from './components/ProtectedRoutes';

const routes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <Users />
          </RoleBasedRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'assistants',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'medic']}>
            <Assistants />
          </RoleBasedRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'patients',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'medic']}>
            <Patients />
          </RoleBasedRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'appointments',
        element: (
          <RoleBasedRoute allowedRoles={['medic']}>
            <Appointments />
          </RoleBasedRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'profile',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <Profile />
          </RoleBasedRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: '/unauthorized',
        element: (
          <div className='min-h-80 flex justify-center items-center text-3xl'>
            <p>🚫 No tiene permiso para acceder a esta página</p>
          </div>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default routes;
