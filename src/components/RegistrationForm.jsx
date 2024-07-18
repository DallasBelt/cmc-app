import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Swal from 'sweetalert2';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { CalendarDots, Eye, EyeSlash } from '@phosphor-icons/react';

import { registrationSchema } from '@/utils/formSchema';
import LoadingOverlay from './LoadingOverlay';

const RegistrationForm = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isSuperPath = currentPath.includes('super');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const newUser = {
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(
        'https://cmc-api-42qy.onrender.com/api/v1/auth/register',
        newUser
      );

      if (response && response.status === 201) {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Ya puedes iniciar sesión.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          form.reset();
        });
      } else {
        Swal.fire({
          title: 'Oops...',
          text: 'Error interno del servidor.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log('Detalles del error:', error.response.data);
      }

      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: 'Oops...',
          text: 'Error al completar registro.',
          icon: 'error',
        });
      } else if (error.message === 'Network Error') {
        Swal.fire({
          title: 'Oops...',
          text: 'Error interno del servidor.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Oops...',
          text: 'Ocurrió un error desconocido.',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
          {/* <div className='space-y-2.5 md:space-y-0 md:flex md:gap-2.5'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nombre' {...field} className='h-10' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Apellido' {...field} className='h-10' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Correo electrónico'
                    {...field}
                    className='h-10'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Contraseña'
                      {...field}
                      className='h-10'
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className='cursor-pointer absolute right-10 text-slate-500'
                    >
                      {showPassword ? (
                        <Eye size={24} />
                      ) : (
                        <EyeSlash size={24} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center'>
                    <Input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder='Repita la contraseña'
                      {...field}
                      className='h-10'
                    />
                    <span
                      onClick={togglePasswordConfirmVisibility}
                      className='cursor-pointer absolute right-10 text-slate-500'
                    >
                      {showPasswordConfirm ? (
                        <Eye size={24} />
                      ) : (
                        <EyeSlash size={24} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal h-10',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Fecha de nacimiento</span>
                        )}
                        <CalendarDots
                          size={24}
                          className='ml-auto h-4 w-4 opacity-50'
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      captionLayout='dropdown'
                      toYear={2010}
                      fromYear={1940}
                      defaultMonth={new Date(1987, 7)}
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className='flex justify-center'>
            <Button
              type='submit'
              className={
                isSuperPath
                  ? 'mt-5 h-10'
                  : 'mt-5 h-10 text-xl bg-green-500 hover:bg-green-400'
              }
            >
              {isSuperPath ? 'Crear usuario' : 'Registrarse'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegistrationForm;
