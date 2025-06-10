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
  Unauthorized,
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
          <IsProfileCompleteRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
              <Users />
            </RoleBasedRoute>
          </IsProfileCompleteRoute>
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
        path: 'unauthorized',
        element: <Unauthorized />,
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
