import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createMedicInfo,
  getMedicInfo,
  updateMedicInfo,
} from '@/api/medic-info';

export const useMedicInfo = () => {
  const queryClient = useQueryClient();

  const createMedicInfoMutation = useMutation({
    mutationFn: createMedicInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['medicInfo']);
      toast.success('Información médica creada exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear información médica.');
    },
  });

  const medicInfoQuery = useQuery({
    queryKey: ['medicInfo'],
    queryFn: getMedicInfo,
  });

  const updateMedicInfoMutation = useMutation({
    mutationFn: updateMedicInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(['medicInfo']);
      toast.success('Información médica actualizada exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al actualizar información médica.');
    },
  });

  return {
    createMedicInfoMutation,
    medicInfoQuery,
    updateMedicInfoMutation,
  };
};
