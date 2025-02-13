import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  changeAppointmentStatus,
  deleteAppointment,
} from '@/api/appointment';

import { useAppointmentStore } from '@/store';

export const useAppointments = () => {
  const queryClient = useQueryClient();

  const setCreateAppointmentDialog = useAppointmentStore(
    (state) => state.setCreateAppointmentDialog
  );
  const setAppointmentDropdown = useAppointmentStore(
    (state) => state.setAppointmentDropdown
  );
  const setAppointmentStatus = useAppointmentStore(
    (state) => state.setAppointmentStatus
  );

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('¡Cita creada exitósamente!');
      setCreateAppointmentDialog(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear cita.');
    },
  });

  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      setAppointmentDropdown(false);
      toast.info('La cita ha sido eliminada.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error en la solicitud.');
    },
  });

  const changeAppointmentStatusMutation = useMutation({
    mutationFn: changeAppointmentStatus,
    onSuccess: (newAppointmentStatus) => {
      queryClient.invalidateQueries(['appointments']);
      setAppointmentDropdown(false);
      setAppointmentStatus(newAppointmentStatus);
      toast.info(
        `La cita ha sido ${
          newAppointmentStatus === 'canceled' ? 'cancelada' : 'reagendada'
        }.`
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error en la solicitud.');
    },
  });

  // const updateAppointmentMutation = useMutation({
  //   mutationFn: updateAppointment,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['appointments']);
  //     setDropdownOpen(false);
  //     toast.info('La cita ha sido actualizada.');
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     toast.error('Error en la solicitud.');
  //   },
  // });

  return {
    createAppointmentMutation,
    appointmentsQuery,
    deleteAppointmentMutation,
    changeAppointmentStatusMutation,
    // updateAppointmentMutation,
  };
};
