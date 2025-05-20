import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createSchedule, getSchedules } from '@/api/schedule';

export const useSchedules = () => {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
      toast.success('Horario creado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear horario.');
    },
  });

  const schedulesQuery = useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
  });

  return {
    createScheduleMutation,
    schedulesQuery,
  };
};
