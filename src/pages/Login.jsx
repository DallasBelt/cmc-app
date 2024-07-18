import { Link } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';

import LoginForm from '@/components/LoginForm';
import isotypeLogin from '@/assets/isotype-login.svg';

import RegistrationDialog from '@/components/RegistrationDialog';

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center select-none'>
      <Toaster
        position='top-right'
        theme='light'
        richColors
        toastOptions={{}}
        expand
        visibleToasts={3}
      />

      <div className='flex flex-col items-center justify-center md:flex-row'>
        <img src={isotypeLogin} className='mb-10 w-60 md:mb-0 md:w-1/3' />
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
    </div>
  );
};

export default Login;
