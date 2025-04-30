import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { completeProfile, login, register } from '@/api/auth';
import { useRegistrationStore, useToastStore } from '@/store';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setToast = useToastStore((state) => state.setToast);
  const setRegistrationDialog = useRegistrationStore(
    (state) => state.setRegistrationDialog
  );

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('roles', data.roles);
      sessionStorage.setItem('isProfileComplete', data.isProfileComplete);
      sessionStorage.setItem('token', data.token);

      if (data.roles.includes('user')) {
        sessionStorage.clear();
        toast.error('Esperando activación.');
        return;
      }

      setToast(true, '¡Inicio de sesión exitoso!');
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      if (error.errorCode === 'USER_INACTIVE') {
        toast.error('Usuario inactivo.');
        return;
      }

      if (error.errorCode === 'USER_UNAUTHORIZED') {
        toast.error('Usuario no autorizado.');
        return;
      }

      if (error.errorCode === 'BAD_CREDENTIALS') {
        toast.error('Revise sus credenciales.');
        return;
      }

      if (error.status) {
        toast.error('Error al iniciar sesión.');
      }
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

  const completeProfileMutation = useMutation({
    mutationFn: completeProfile,
    onSuccess: () => {
      toast.success('Perfil completado exitosamente.');
      queryClient.invalidateQueries(['user']);
      sessionStorage.setItem('isProfileComplete', true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    },
    onError: (error) => {
      console.error(error);
      toast.error('No se pudo completar el perfil.');
    },
  });

  return {
    loginMutation,
    registerMutation,
    completeProfileMutation,
  };
};
