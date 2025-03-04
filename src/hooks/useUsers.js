import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { changeRole, changeState, getUsers } from '@/api/user';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const changeRoleMutation = useMutation({
    mutationFn: changeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Rol del usuario cambiado con éxito.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al cambiar el rol del usuario.');
    },
  });

  const changeStateMutation = useMutation({
    mutationFn: changeState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Estado del usuario cambiado con éxito.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al cambiar el estado del usuario.');
    },
  });

  return {
    changeRoleMutation,
    changeStateMutation,
    usersQuery,
  };
};
