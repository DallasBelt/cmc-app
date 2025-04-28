import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createUserInfo, getUserInfo } from '@/api/user-info';

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const createUserInfoMutation = useMutation({
    mutationFn: createUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      toast.success('Información personal creada exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear información personal.');
    },
  });

  const userInfoQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });

  return {
    createUserInfoMutation,
    userInfoQuery,
  };
};
