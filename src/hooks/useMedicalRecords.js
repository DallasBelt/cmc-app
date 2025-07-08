import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMedicalRecord, getMedicalRecords } from '@/api/medical-record';
import { useMedicalRecordStore } from '@/store/useMedicalRecordStore';

export const useMedicalRecords = () => {
  const queryClient = useQueryClient();
  const { setDialogOpen } = useMedicalRecordStore();

  const createMedicalRecordMutation = useMutation({
    mutationFn: createMedicalRecord,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['medical-records']);
      setDialogOpen(false);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear la entrada.', { description: error.message });
    },
  });

  const medicalRecordsQuery = useQuery({
    queryKey: ['medical-records'],
    queryFn: getMedicalRecords,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    createMedicalRecordMutation,
    medicalRecordsQuery,
  };
};
