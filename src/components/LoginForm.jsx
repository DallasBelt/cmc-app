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
import { loginSchema } from '@/validators/formSchema';

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/v1/user/login',
        values
      );

      if (!response) {
        Swal.fire({
          title: 'Error interno del servidor.',
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
          title: 'Revise sus credenciales.',
          icon: 'error',
        });
      } else if (error.code === 'ERR_NETWORK') {
        Swal.fire({
          title: 'Error interno del servidor.',
          icon: 'error',
        });
      }
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
                  className={
                    form.formState.errors.email
                      ? `h-14 text-lg border-red-500`
                      : `h-14 text-lg`
                  }
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
  );
};

export default LoginForm;
