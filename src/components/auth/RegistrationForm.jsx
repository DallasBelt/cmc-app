import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Eye, EyeOff, Loader2 } from 'lucide-react';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui';

import { useAuth } from '@/hooks';
import { registrationSchema } from '@/schemas';

export const RegistrationForm = () => {
  const { registerMutation } = useAuth();

  // Hide/Show password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Hide/Show confirm password button
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => setShowPasswordConfirm(!showPasswordConfirm);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    // Hide password fields
    setShowPassword(false);
    setShowPasswordConfirm(false);

    const newUser = {
      email: values.email,
      password: values.password,
    };

    registerMutation.mutate(newUser);
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
                <Input type='email' placeholder='Correo electrónico' {...field} className='h-10' />
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
                    {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
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
                    {showPasswordConfirm ? <Eye size={24} /> : <EyeOff size={24} />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-center pt-3'>
          <Button
            type='submit'
            className='h-10 text-xl bg-green-500 hover:bg-green-400'
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending && <Loader2 className='animate-spin' />}
            Registrarse
          </Button>
        </div>
      </form>
    </Form>
  );
};
