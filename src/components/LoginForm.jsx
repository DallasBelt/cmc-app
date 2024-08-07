import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { toast } from 'sonner';

import { RotatingLines } from 'react-loader-spinner';

import { Eye, EyeSlash } from '@phosphor-icons/react';

import { loginSchema } from '@/utils/formSchema';

const LoginForm = () => {
  const navigate = useNavigate();

  // Hide/Show password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Loading with React Spinners
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      // Show loading React Spinners
      setIsSubmitting(true);

      // Hide password field
      setShowPassword(false);

      // Send the request to the server
      // https://cmc-api-42qy.onrender.com/api/v1/auth/login
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        values
      );

      // Write 'token' and 'roles' to the sessionStorage
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('roles', response.data.roles);

      // Get the value of 'roles' from sessionStorage
      const roles = sessionStorage.getItem('roles');

      // If the role is 'user' don't allow login
      if (roles.includes('user')) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('roles');
        return toast.error('Oops...', {
          description: 'Esperando activación.',
        });
      } else {
        // Redirect to the home page
        navigate('/', {
          state: {
            showToast: true,
            toastMessage: 'Ha iniciado sesión correctamente.',
          },
        });
      }
    } catch (error) {
      console.error(error);
      if (error && error.code === 'ERR_NETWORK') {
        toast.error('Oops...', {
          description: 'Error de conexión.',
        });
      }

      if (error && error.response.status === 401) {
        toast.error('Oops...', {
          description: 'Revise sus credenciales.',
        });
      } else {
        toast.error('Oops...', {
          description: 'Error interno del servidor.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type='email'
                  placeholder='Correo electrónico'
                  className='h-12 text-lg select-none'
                  {...field}
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center relative'>
                  <Input
                    disabled={isSubmitting}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    className='h-12 text-lg'
                    {...field}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className={
                      isSubmitting
                        ? 'cursor-not-allowed absolute right-3 text-slate-500'
                        : 'cursor-pointer absolute right-3 text-slate-500'
                    }
                  >
                    {showPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full h-12 text-xl'
        >
          INICIAR SESIÓN
          {isSubmitting && (
            <span className='ms-2'>
              <RotatingLines
                visible={true}
                height='20'
                width='20'
                strokeColor='#FFF'
                strokeWidth={5}
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
              />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
