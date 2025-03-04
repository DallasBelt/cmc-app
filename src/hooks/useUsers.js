import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { changeRole, getUsers } from '@/api/user';
import { useUsersStore } from '@/store';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const setDropdownMenu = useUsersStore((state) => state.setDropdownMenu);

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const changeRoleMutation = useMutation({
    mutationFn: changeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Rol del usuario cambiado con éxito.');
      setDropdownMenu(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al cambiar el rol del usuario.');
    },
  });

  return {
    changeRoleMutation,
    usersQuery,
  };
};
