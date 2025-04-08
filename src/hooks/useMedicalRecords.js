import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMedicalRecord, getMedicalRecords } from '@/api/medical-record';

// import {
//   createPatient,
//   deletePatient,
//   getPatients,
//   updatePatient,
// } from '@/api/patient';
// import { usePatientStore } from '@/store';

export const useMedicalRecords = () => {
  const queryClient = useQueryClient();

  // const setCreatePatientDialog = usePatientStore(
  //   (state) => state.setCreatePatientDialog
  // );

  const createMedicalRecordMutation = useMutation({
    mutationFn: createMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries(['medical-records']);
      toast.success('¡Entrada creada exitósamente!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear entrada.');
    },
  });

  const medicalRecordsQuery = useQuery({
    queryKey: ['medical-records'],
    queryFn: getMedicalRecords,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // const patientsQuery = useQuery({
  //   queryKey: ['patients'],
  //   queryFn: getPatients,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  // const updatePatientMutation = useMutation({
  //   mutationFn: updatePatient,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['patients']);
  //     toast.success('¡Paciente actualizado exitósamente!');
  //     setCreatePatientDialog(false);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     toast.error('Error al actualizar paciente.');
  //   },
  // });

  // const deletePatientMutation = useMutation({
  //   mutationFn: deletePatient,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['patients']);
  //     toast.success('Paciente eliminado exitósamente.');
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     toast.error('Error al eliminar paciente.');
  //   },
  // });

  return {
    createMedicalRecordMutation,
    medicalRecordsQuery,
    // patientsQuery,
    // deletePatientMutation,
    // updatePatientMutation,
  };
};
