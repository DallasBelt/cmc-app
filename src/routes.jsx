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
} from '@/components/protected-routes';

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
        errorElement: <div>Oops!</div>,
      },
      {
        path: 'users',
        element: (
          <CheckUserInfoRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
              <Users />
            </RoleBasedRoute>
          </CheckUserInfoRoute>
        ),
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
      },
      {
        path: 'complete-info',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <CompleteInfo />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/unauthorized',
        element: <div>🚫 No tiene permiso para acceder</div>,
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
