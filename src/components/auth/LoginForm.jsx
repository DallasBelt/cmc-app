import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { loginSchema } from '@/schemas';

export const LoginForm = () => {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    // Hide password field
    setShowPassword(false);
    loginMutation.mutate(values);
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
                  disabled={loginMutation.isPending}
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
                    disabled={loginMutation.isPending}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    className='h-12 text-lg'
                    {...field}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className={
                      loginMutation.isPending
                        ? 'cursor-not-allowed absolute right-3 text-slate-500'
                        : 'cursor-pointer absolute right-3 text-slate-500'
                    }
                  >
                    {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={loginMutation.isPending}
          className='w-full h-12 text-xl'
        >
          {loginMutation.isPending && <Loader2 className='animate-spin' />}
          INICIAR SESIÓN
        </Button>
      </form>
    </Form>
  );
};
