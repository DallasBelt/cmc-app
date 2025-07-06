import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPatient, deletePatient, getPatients, updatePatient } from '@/api/patient';

import { usePatientStore } from '@/store';

export const usePatients = () => {
  const queryClient = useQueryClient();

  const setCreatePatientDialog = usePatientStore((state) => state.setCreatePatientDialog);

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('¡Paciente creado exitósamente!');
      setCreatePatientDialog(false);
    },
    onError: (error) => {
      toast.error('Error al crear paciente.', { description: error.message });
    },
  });

  const patientsQuery = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const updatePatientMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('¡Paciente actualizado exitósamente!');
      setCreatePatientDialog(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al actualizar paciente.');
    },
  });

  const deletePatientMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('Paciente eliminado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al eliminar paciente.');
    },
  });

  return {
    createPatientMutation,
    patientsQuery,
    deletePatientMutation,
    updatePatientMutation,
  };
};
