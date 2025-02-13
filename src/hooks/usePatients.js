import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPatient, getPatients } from '@/api/patient';
import { usePatientStore } from '@/store';

export const usePatients = () => {
  const queryClient = useQueryClient();

  const setCreatePatientModal = usePatientStore(
    (state) => state.createPatientModal
  );

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('¡Paciente creado exitósamente!');
      setCreatePatientModal(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear paciente.');
    },
  });

  const patientsQuery = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { createPatientMutation, patientsQuery };
};
