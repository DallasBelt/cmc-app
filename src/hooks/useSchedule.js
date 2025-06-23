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
  const userId = sessionStorage.getItem('id');

  const scheduleQuery = useQuery({
    queryKey: ['schedule', userId],
    queryFn: getSchedule,
  });

  const schedule = scheduleQuery.data || [];

  const isLoading = scheduleQuery.isLoading;
  const hasSchedule = Array.isArray(schedule) && schedule.length > 0;
  const isEmpty = Array.isArray(schedule) && schedule.length === 0;

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario creado exitosamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al crear horario: ${error.message}`);
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      toast.success('Horario actualizado exitosamente.');
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Error al actualizar el horario: ${error.message}`);
    },
  });

  return {
    createScheduleMutation,
    updateScheduleMutation,
    scheduleQuery,
    schedule,
    isLoading,
    isEmpty,
    hiddenDays: hasSchedule ? getHiddenDays(schedule) : null,
    availableTimes: hasSchedule ? getAvailableTimes(schedule) : [],
    slotMinTime: hasSchedule ? getSlotMinTime(schedule) : null,
    slotMaxTime: hasSchedule ? getSlotMaxTime(schedule) : null,
    isAllowedClick: (date) => hasSchedule && isAllowedClickUtil(schedule, date),
  };
};
