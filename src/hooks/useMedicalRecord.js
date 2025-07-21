import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMedicalRecord, getMedicalRecordByPatient } from '@/api/medical-record';
import { useMedicalRecordStore } from '@/store';

export const useMedicalRecord = (patientId) => {
  const queryClient = useQueryClient();
  const { setDialogOpen } = useMedicalRecordStore();

  const createMedicalRecordMutation = useMutation({
    mutationFn: createMedicalRecord,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['medical-record']);
      setDialogOpen(false);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear la entrada.', { description: error.message });
    },
  });

  const medicalRecordByPatientQuery = useQuery({
    queryKey: ['medical-record', patientId],
    queryFn: () => getMedicalRecordByPatient(patientId),
    enabled: !!patientId,
    select: (data) => data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    createMedicalRecordMutation,
    medicalRecordByPatientQuery,
  };
};
