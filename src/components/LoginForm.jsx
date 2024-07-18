import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { loginSchema } from '@/utils/formSchema';
import LoadingOverlay from './LoadingOverlay';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://cmc-api-42qy.onrender.com/api/v1/auth/login',
        values
      );

      if (!response) {
        Swal.fire({
          title: 'Oops...',
          text: 'Error interno del servidor.',
          icon: 'error',
        });
      } else {
        sessionStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);

      if (error.code === 'ERR_BAD_REQUEST') {
        Swal.fire({
          title: 'Oops...',
          text: 'Revise sus credenciales.',
          icon: 'error',
        });
      } else if (error.code === 'ERR_NETWORK') {
        Swal.fire({
          title: 'Oops...',
          text: 'Error interno del servidor.',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
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
                    className='h-14 text-lg'
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
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
                  <Input
                    type='password'
                    placeholder='Contraseña'
                    className='h-14 text-lg'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full h-12 text-xl'>
            INICIAR SESIÓN
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
