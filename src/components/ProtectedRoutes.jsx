import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'sonner';
import { RotatingLines } from 'react-loader-spinner';

// Allow navigation if there's an auth token; redirect to the login page otherwise
export const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to='/login' replace />;
};

// Prevent going back to the login page if there's an auth token
export const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to='/' replace /> : children;
};

// Prevent navigation for certain roles
export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

// If there's no user info redirect to '/complete-registration'
export const DataCheckRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  useEffect(() => {
    const checkUserInfo = async () => {
      if (role === 'admin') {
        setLoading(false);
        return;
      }

      try {
        await axios.get('http://localhost:3000/api/v1/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Don't redirect if there's user info
        setShouldRedirect(false);
      } catch (error) {
        // If no user info is found (404) redirect to '/complete-registration'
        if (error.response && error.response.status === 404) {
          setShouldRedirect(true);
        }

        // Show info toast
        toast.warning('Importante', {
          description:
            'Debe completar el registro antes de poder usar la aplicación.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      checkUserInfo();
    } else {
      setLoading(false);
    }
  }, [token, role]);

  if (loading) {
    // Show React Spinners while loading
    return (
      <div className='h-96 flex justify-center items-center'>
        <RotatingLines
          visible={true}
          height='100'
          width='100'
          strokeColor='#2563eb'
          strokeWidth={5}
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to='/complete-registration' replace />;
  }

  return children;
};
