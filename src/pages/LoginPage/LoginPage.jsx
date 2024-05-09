import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';
import login from '@/assets/login.jpg';
import logo from '@/assets/logo.svg';

const LoginPage = () => {
  return (
    <>
      <img src={logo} className='w-48 my-5 mx-auto' />

      <div className='flex items-center md:flex-row md:justify-center'>
        <img src={login} alt='' className='hidden lg:block lg:w-2/4 xl:w-2/6' />
        <div className='flex flex-col w-full sm:w-3/4 lg:w-2/4 xl:w-2/6 px-10 space-y-5'>
          <LoginForm />

          <a
            href='#'
            className='text-center text-blue-500 cursor:pointer hover:underline'
          >
            ¿Olvidó su contraseña?
          </a>
          <hr className='text-center mx-auto w-80'></hr>

          <Button className='text-lg w-auto h-14 mx-auto bg-green-600 hover:bg-green-500'>
            Registrarse
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
