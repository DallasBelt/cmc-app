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
import { updatePasswordSchema } from '@/schemas';

export const UpdatePasswordForm = () => {
  const { updatePasswordMutation } = useAuth();

  // Hide/Show current password button
  const [revealCurrentPassword, setRevealCurrentPassword] = useState(false);
  const toggleCurrentPasswordReveal = () =>
    setRevealCurrentPassword(!revealCurrentPassword);

  // Hide/Show new password button
  const [revealNewPassword, setRevealNewPassword] = useState(false);
  const toggleRevealNewPassword = () =>
    setRevealNewPassword(!revealNewPassword);

  // Hide/Show confirm new password button
  const [revealConfirmNewPassword, setRevealConfirmNewPassword] =
    useState(false);
  const toggleRevealConfirmNewPassword = () =>
    setRevealConfirmNewPassword(!revealConfirmNewPassword);

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (values) => {
    // Hide password fields
    setRevealCurrentPassword(false);
    setRevealNewPassword(false);
    setRevealConfirmNewPassword(false);

    updatePasswordMutation.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center relative'>
                  <Input
                    type={revealCurrentPassword ? 'text' : 'password'}
                    placeholder='Contraseña actual'
                    {...field}
                    className='h-10'
                  />
                  <span
                    onClick={toggleCurrentPasswordReveal}
                    className='cursor-pointer absolute right-3 text-slate-500'
                  >
                    {revealCurrentPassword ? (
                      <Eye size={24} />
                    ) : (
                      <EyeOff size={24} />
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
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center relative'>
                  <Input
                    type={revealNewPassword ? 'text' : 'password'}
                    placeholder='Contraseña nueva'
                    {...field}
                    className='h-10'
                  />
                  <span
                    onClick={toggleRevealNewPassword}
                    className='cursor-pointer absolute right-3 text-slate-500'
                  >
                    {revealNewPassword ? (
                      <Eye size={24} />
                    ) : (
                      <EyeOff size={24} />
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
          name='confirmNewPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center relative'>
                  <Input
                    type={revealConfirmNewPassword ? 'text' : 'password'}
                    placeholder='Repita la contraseña nueva'
                    {...field}
                    className='h-10'
                  />
                  <span
                    onClick={toggleRevealConfirmNewPassword}
                    className='cursor-pointer absolute right-3 text-slate-500'
                  >
                    {revealConfirmNewPassword ? (
                      <Eye size={24} />
                    ) : (
                      <EyeOff size={24} />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-center pt-3'>
          <Button type='submit' disabled={updatePasswordMutation.isPending}>
            {updatePasswordMutation.isPending && (
              <Loader2 className='animate-spin' />
            )}
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </Form>
  );
};
