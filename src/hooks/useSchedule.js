import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createSchedule, getSchedule, updateSchedule } from '@/api/schedule';

import {
  getAvailableTimes,
  getHiddenDays,
  getSlotMinTime,
  getSlotMaxTime,
  isAllowedClick as isAllowedClickUtil,
} from '@/utils';

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario creado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al crear horario: ${error.message}`);
    },
  });

  const scheduleQuery = useQuery({
    queryKey: ['schedule'],
    queryFn: getSchedule,
  });

  const updateScheduleMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario actualizado exitósamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al actualizar el horario: ${error.message}`);
    },
  });

  const schedule = scheduleQuery.data || [];

  return {
    createScheduleMutation,
    scheduleQuery,
    updateScheduleMutation,
    hiddenDays: getHiddenDays(schedule),
    availableTimes: getAvailableTimes(schedule),
    slotMinTime: getSlotMinTime(schedule),
    slotMaxTime: getSlotMaxTime(schedule),
    isAllowedClick: (date) => isAllowedClickUtil(schedule, date),
  };
};
