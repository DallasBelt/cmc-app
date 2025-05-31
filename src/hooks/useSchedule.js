import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createSchedule, getSchedule, updateSchedule } from '@/api/schedule';

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario creado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al crear horario: ${error.message}`);
    },
  });

  const scheduleQuery = useQuery({
    queryKey: ['schedule'],
    queryFn: getSchedule,
  });

  const updateScheduleMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario actualizado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al actualizar el horario: ${error.message}`);
    },
  });

  return {
    createScheduleMutation,
    scheduleQuery,
    updateScheduleMutation,
  };
};
