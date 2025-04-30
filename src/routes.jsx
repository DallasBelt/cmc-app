import {
  Appointments,
  CompleteProfile,
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
  IsProfileCompleteRoute,
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
          <IsProfileCompleteRoute>
            <Index />
          </IsProfileCompleteRoute>
        ),
        errorElement: <div>Oops!</div>,
      },
      {
        path: 'users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <IsProfileCompleteRoute>
              <Users />
            </IsProfileCompleteRoute>
          </RoleBasedRoute>
        ),
      },
      {
        path: 'patients',
        element: (
          <IsProfileCompleteRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Patients />
            </RoleBasedRoute>
          </IsProfileCompleteRoute>
        ),
      },
      {
        path: 'appointments',
        element: (
          <IsProfileCompleteRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Appointments />
            </RoleBasedRoute>
          </IsProfileCompleteRoute>
        ),
      },
      {
        path: 'stats',
        element: (
          <IsProfileCompleteRoute>
            <RoleBasedRoute allowedRoles={['admin', 'medic', 'assistant']}>
              <Statistics />
            </RoleBasedRoute>
          </IsProfileCompleteRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <IsProfileCompleteRoute>
            <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
              <Profile />
            </RoleBasedRoute>
          </IsProfileCompleteRoute>
        ),
      },
      {
        path: 'complete-profile',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <CompleteProfile />
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
