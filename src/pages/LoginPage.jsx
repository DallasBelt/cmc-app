import { Link } from 'react-router-dom';

import LoginForm from '@/components/LoginForm';
import RegisterDialog from '@/components/RegisterDialog';
import login from '@/assets/login.jpg';
import logo from '@/assets/logo.svg';

const LoginPage = () => {
  return (
    <>
      <img src={logo} className='w-48 my-5 mx-auto' />

      <div className='flex items-center justify-center md:flex-row'>
        <img src={login} alt='' className='hidden lg:block lg:w-2/4 xl:w-2/6' />
        <div className='flex flex-col w-full sm:w-3/4 lg:w-2/4 xl:w-2/6 px-10 space-y-5'>
          <LoginForm />

          <Link
            to={'forgot-password'}
            className='text-center text-blue-500 cursor:pointer hover:underline'
          >
            ¿Olvidó su contraseña?
          </Link>
          <hr className='text-center mx-auto w-80'></hr>

          <RegisterDialog />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
