import { Link } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { LoginForm, RegistrationDialog } from '@/components/auth';

import { useAuthStore } from '@/store';

import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme/ThemeProvider';
import LoginLight from '@/assets/login-light.svg';
import LoginDark from '@/assets/login-dark.svg';

export const Login = () => {
  const { effectiveTheme } = useTheme();
  const { isLoggingIn } = useAuthStore();

  return (
    <>
      <Toaster
        position='bottom-right'
        theme={effectiveTheme}
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
            to={isLoggingIn ? '#' : '../forgot-password'}
            onClick={(e) => {
              if (isLoggingIn) {
                e.preventDefault();
              }
            }}
            className={cn(
              'text-center text-blue-500 hover:underline cursor-pointer',
              isLoggingIn && 'opacity-50 pointer-events-none'
            )}
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
