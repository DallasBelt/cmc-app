import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  changeAppointmentStatus,
  deleteAppointment,
} from '@/api/appointment';

import { appointmentStore } from '@/store/appointmentStore';

const useAppointments = () => {
  const queryClient = useQueryClient();

  const setDropdownOpen = appointmentStore((state) => state.setDropdownOpen);
  const setAppointmentStatus = appointmentStore(
    (state) => state.setAppointmentStatus
  );

  const setDialogOpen = appointmentStore((state) => state.setDialogOpen);

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('¡Cita creada exitósamente!');
      setDialogOpen(false);
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
      setDropdownOpen(false);
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
      setDropdownOpen(false);
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

export default useAppointments;
