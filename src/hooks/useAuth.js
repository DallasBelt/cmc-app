import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { login, register, updatePassword } from '@/api/auth';
import { useAuthStore, useRegistrationStore, useToastStore } from '@/store';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggingIn } = useAuthStore();
  const setToast = useToastStore((state) => state.setToast);

  const { setRegistrationDialog } = useRegistrationStore((state) => state);
  const { setUpdatePasswordDialogOpen } = useAuthStore((state) => state);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('role', data.role);
      sessionStorage.setItem('token', data.token);

      if (data.role === 'user') {
        sessionStorage.clear();
        toast.error('El usuario no tiene un rol asignado.');
        return;
      }

      setToast(true, 'Inicio de sesión exitoso.');
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al iniciar sesión.', { description: error.message });
    },
    onSettled: () => {
      setIsLoggingIn(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('¡Registro exitoso!');
      setRegistrationDialog(false);
    },
    onError: (error) => {
      console.error(error);
      if (error.status === 400) {
        toast.error('El correo ya está registrado.');
      } else {
        toast.error('Error al registrar el usuario.');
      }
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('Contraseña actualizada con éxito.');
      setUpdatePasswordDialogOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al actualizar la contraseña.', {
        description: error.message,
      });
    },
  });

  return {
    loginMutation,
    registerMutation,
    updatePasswordMutation,
  };
};
