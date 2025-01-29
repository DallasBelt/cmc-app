import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { getAppointments } from '@/api/getAppointments';
import { deleteAppointment } from '@/api/deleteAppointment';
import { changeAppointmentStatus } from '@/api/changeAppointmentStatus';

import { appointmentStore } from '@/store/appointmentStore';

const useAppointments = () => {
  const queryClient = useQueryClient();

  const setDropdownOpen = appointmentStore((state) => state.setDropdownOpen);
  const setAppointmentStatus = appointmentStore(
    (state) => state.setAppointmentStatus
  );

  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
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

  return {
    appointmentsQuery,
    deleteAppointmentMutation,
    changeAppointmentStatusMutation,
  };
};

export default useAppointments;
