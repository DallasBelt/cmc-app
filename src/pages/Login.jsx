import { Link } from 'react-router-dom';

import LoginForm from '@/components/LoginForm';
import { Toaster } from '@/components/ui/sonner';

import RegistrationDialog from '@/components/RegistrationDialog';
import { useTheme } from '@/components/theme-provider';
import LoginLight from '@/assets/login-light.svg';
import LoginDark from '@/assets/login-dark.svg';

const Login = () => {
  const { effectiveTheme } = useTheme();

  return (
    <>
      <Toaster
        position='bottom-right'
        theme='light'
        richColors
        toastOptions={{}}
        expand
        visibleToasts={3}
      />

      <div className='min-h-screen flex flex-col items-center justify-center select-none md:flex-row'>
        <img
          src={effectiveTheme === 'light' ? LoginLight : LoginDark}
          className='mb-10 w-60 md:mb-0 md:w-1/3'
        />
        <div className='flex flex-col w-full sm:w-3/4 lg:w-2/4 xl:w-2/6 px-10 space-y-5'>
          <LoginForm />

          <Link
            to={'../forgot-password'}
            className='text-center text-blue-500 cursor:pointer hover:underline'
          >
            ¿Olvidó su contraseña?
          </Link>

          <hr className='w-80 m-auto'></hr>

          <RegistrationDialog />
        </div>
      </div>
    </>
  );
};

export default Login;
