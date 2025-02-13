import {
  Appointments,
  CompleteInfo,
  Error,
  ForgotPassword,
  Index,
  Login,
  Patients,
  Profile,
  Root,
  Statistics,
  Users,
} from '@/pages';

import {
  PrivateRoute,
  PublicRoute,
  RoleBasedRoute,
  CheckUserInfoRoute,
} from '@/components/ProtectedRoutes';

export const routes = [
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
        element: (
          <CheckUserInfoRoute>
            <Index />
          </CheckUserInfoRoute>
        ),
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
        path: 'patients',
        element: (
          <CheckUserInfoRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Patients />
            </RoleBasedRoute>
          </CheckUserInfoRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'appointments',
        element: (
          <CheckUserInfoRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Appointments />
            </RoleBasedRoute>
          </CheckUserInfoRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'stats',
        element: (
          <CheckUserInfoRoute>
            <RoleBasedRoute allowedRoles={['admin', 'medic', 'assistant']}>
              <Statistics />
            </RoleBasedRoute>
          </CheckUserInfoRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'profile',
        element: (
          <CheckUserInfoRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Profile />
            </RoleBasedRoute>
          </CheckUserInfoRoute>
        ),
        errorElement: <div>Oops! Hubo un error.</div>,
      },
      {
        path: 'complete-info',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <CompleteInfo />
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
