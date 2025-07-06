import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import {
  updateAssistants,
  getAssistants,
  getAssistantsByMedic,
  getAvailableAssistants,
} from '@/api/assistant-info';
import { useAssistantStore } from '@/store';

export const useAssistants = () => {
  const queryClient = useQueryClient();
  const { medicId } = useAssistantStore();

  const updateAssistantsMutation = useMutation({
    mutationFn: updateAssistants,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['assistants']);
      switch (data.type) {
        case 'success':
          toast.success(data.message);
          break;
        case 'info':
          toast.info(data.message);
          break;
        case 'warning':
          toast.warning?.(data.message);
          break;
        case 'error':
          toast.error(data.message);
          break;
        default:
          toast(data.message);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const assistantsQuery = useQuery({
    queryKey: ['assistants'],
    queryFn: getAssistants,
  });

  const assistantsByMedicQuery = useQuery({
    queryKey: ['assistantsByMedic', medicId],
    queryFn: ({ queryKey }) => {
      const [, medicId] = queryKey;
      return getAssistantsByMedic(medicId);
    },
    enabled: !!medicId,
  });

  const availableAssistantsQuery = useQuery({
    queryKey: ['availableAssistants'],
    queryFn: getAvailableAssistants,
  });

  return {
    updateAssistantsMutation,
    assistantsQuery,
    assistantsByMedicQuery,
    availableAssistantsQuery,
  };
};
