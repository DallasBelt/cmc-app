import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { Eye, EyeSlash, UserPlus } from '@phosphor-icons/react';

import { registrationSchema } from '@/utils/registrationSchema';
import { useRegistrationStore } from '@/store/store';

const RegistrationForm = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');
  const setModalState = useRegistrationStore((state) => state.setModalState);

  // Hide/Show password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Hide/Show confirm password button
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  // Loading with React Spinners
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Show loading React Spinners
      setIsSubmitting(true);

      // Hide password and confirm password fields
      setShowPassword(false);
      setShowPasswordConfirm(false);

      const newUser = {
        email: values.email,
        password: values.password,
      };

      // https://cmc-api-42qy.onrender.com/api/v1/auth/register
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        newUser
      );

      if (response && response.status === 201) {
        {
          !token
            ? (toast.success('Registro exitoso'),
              toast.info('Importante', {
                description:
                  'Espere activación del administrador para iniciar sesión.',
                duration: 5000,
              }))
            : toast.success('¡Enhorabuena!', {
                description: 'Se ha creado un nuevo usuario.',
              });
        }

        form.reset();
        setModalState(false);
      } else {
        toast.error('Oops...', {
          description: 'Error interno del servidor.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Error', {
          description: 'El correo ya está registrado.',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
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
                <div className='flex items-center relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    {...field}
                    className='h-10'
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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center relative'>
                  <Input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder='Repita la contraseña'
                    {...field}
                    className='h-10'
                  />
                  <span
                    onClick={togglePasswordConfirmVisibility}
                    className='cursor-pointer absolute right-3 text-slate-500'
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

        <div className='flex justify-end pt-3'>
          <Button
            type='submit'
            className={
              !token ? 'h-10 text-xl bg-green-500 hover:bg-green-400' : 'none'
            }
            disabled={isSubmitting}
          >
            <UserPlus size={24} className={!token ? 'hidden' : 'mr-2'} />
            {!token ? 'Registrarse' : 'Crear'}
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
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
