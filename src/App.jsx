import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage';
import ForgotPassword from './pages/ForgotPassword';

const privateRoute = (element) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <LoginPage />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: privateRoute(<LoginPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
