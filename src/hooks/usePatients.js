import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useNewPatientModalStore } from '@/store/store';

import { createPatient, getPatients } from '@/api/patient';

export const usePatients = () => {
  const queryClient = useQueryClient();

  const setModalState = useNewPatientModalStore((state) => state.setModalState);

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('¡Paciente creado exitósamente!');
      setModalState(false);
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
