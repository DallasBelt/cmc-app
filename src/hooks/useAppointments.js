import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { getAppointments } from '@/api/getAppointments';
import { deleteAppointment } from '@/api/deleteAppointment';

import { appointmentStore } from '@/store/appointmentStore';

const useAppointments = () => {
  const queryClient = useQueryClient();
  const setDropdownOpen = appointmentStore((state) => state.setDropdownOpen);

  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      setDropdownOpen(false);
      toast.success('La cita ha sido eliminada.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    },
  });

  return { appointmentsQuery, deleteAppointmentMutation };
};

export default useAppointments;
