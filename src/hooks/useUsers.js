import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignRole, toggleStatus, getUsers } from '@/api/user';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const assignRoleMutation = useMutation({
    mutationFn: assignRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Rol del usuario asignado con éxito.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al asignar el rol del usuario.', {
        description: error.message,
      });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Estado del usuario cambiado con éxito.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al cambiar el estado del usuario.', {
        description: error.message,
      });
    },
  });

  return {
    assignRoleMutation,
    toggleStatusMutation,
    usersQuery,
  };
};
