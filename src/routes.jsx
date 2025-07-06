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
  Reports,
  Unauthorized,
  Users,
} from '@/pages';

import { PrivateRoute, PublicRoute, RoleBasedRoute } from '@/components/protected-routes';

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
        element: <Index />,
        errorElement: <Error />,
      },
      {
        errorElement: <Error />,
        path: 'users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <Users />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'patients',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <Patients />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'appointments',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <Appointments />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'reports',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'medic', 'assistant']}>
            <Reports />
          </RoleBasedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <RoleBasedRoute allowedRoles={['medic', 'assistant']}>
            <Profile />
          </RoleBasedRoute>
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
