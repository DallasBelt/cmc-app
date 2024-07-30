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

import { Oval } from 'react-loader-spinner';

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
      const response = await axios.post(
        'https://cmc-api-42qy.onrender.com/api/v1/auth/login',
        values
      );

      // Write the token and role to the sessionStorage
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('roles', response.data.roles);

      // Redirect after timeout
      navigate('/', {
        state: {
          showToast: true,
          toastMessage: 'Ha iniciado sesión correctamente.',
        },
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    className='h-12 text-lg'
                    {...field}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className='cursor-pointer absolute right-3 text-slate-500'
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
              <Oval
                visible={true}
                height='20'
                width='20'
                color='#FFF'
                secondaryColor='#2563eb'
                strokeWidth={6}
                ariaLabel='oval-loading'
              />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
