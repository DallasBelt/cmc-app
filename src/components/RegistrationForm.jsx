import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

// import { cn } from '@/lib/utils';
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';

import { toast } from 'sonner';

import { Oval } from 'react-loader-spinner';

import { Eye, EyeSlash, UserPlus } from '@phosphor-icons/react';

import { registrationSchema } from '@/utils/formSchema';

const RegistrationForm = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');

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

      const response = await axios.post(
        'https://cmc-api-42qy.onrender.com/api/v1/auth/register',
        newUser
      );

      if (response && response.status === 201) {
        {
          !token
            ? toast.success('Registro exitoso', {
                description: 'Ya puedes iniciar sesión.',
              })
            : toast.success('¡Enhorabuena!', {
                description: 'Se ha creado un nuevo usuario.',
              });
        }
        form.reset();
        {
          !token
            ? setTimeout(() => {
                window.location.reload();
              }, 2000)
            : null;
        }
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
                <Oval
                  visible={true}
                  height='20'
                  width='20'
                  color='#FFF'
                  secondaryColor='#22c55e'
                  strokeWidth={6}
                  ariaLabel='oval-loading'
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
