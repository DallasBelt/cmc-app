import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createUserInfo, getUserInfo, updateUserInfo } from '@/api/user-info';
import { se } from 'date-fns/locale';

export const useUserInfo = () => {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('id');

  const createUserInfoMutation = useMutation({
    mutationFn: createUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      toast.success('Información personal creada exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear información personal.', {
        description: error.message,
      });
    },
  });

  const userInfoQuery = useQuery({
    queryKey: ['userInfo', userId],
    queryFn: getUserInfo,
  });

  const updateUserInfoMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      toast.success('Información personal actualizada exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al actualizar información personal.');
    },
  });

  return {
    createUserInfoMutation,
    userInfoQuery,
    updateUserInfoMutation,
  };
};
