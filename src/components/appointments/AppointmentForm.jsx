import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { format, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarDays, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { SearchPatients } from '@/components/patients';

import { useAppointments, useSchedule } from '@/hooks';
import { useAppointmentStore } from '@/store';
import { newAppointmentSchema } from '@/schemas';

import { getAvailableTimesForDay } from '@/utils/scheduleUtils';
export const AppointmentForm = () => {
  setDefaultOptions({ locale: es });

  const { hiddenDays, schedule } = useSchedule();

  const { appointmentsQuery, createAppointmentMutation, updateAppointmentMutation } =
    useAppointments();

  const { appointmentData, editAppointment } = useAppointmentStore();
  const medicId = sessionStorage.getItem('id');

  const appointmentToEdit = appointmentsQuery.data?.data?.find((a) => a.id === appointmentData.id);

  const form = useForm({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      date: editAppointment ? new Date(appointmentToEdit.startTime) : appointmentData.date,
      startTime: editAppointment
        ? format(appointmentToEdit.startTime, 'HH:mm')
        : appointmentData.startTime === '00:00'
          ? ''
          : appointmentData.startTime,
      endTime: editAppointment ? format(appointmentToEdit.endTime, 'HH:mm') : '',
      reason: editAppointment ? appointmentToEdit.reason : '',
      patient: editAppointment ? appointmentToEdit.patient.id : '',
    },
  });

  // Watch selected date and times from the form
  const selectedDate = form.watch('date');
  const startTime = form.watch('startTime')?.trim();
  const endTime = form.watch('endTime')?.trim();

  // Memoize available times for the selected day to avoid unnecessary recalculations
  const availableTimesForDay = useMemo(() => {
    if (!selectedDate || !schedule?.length) return [];
    return getAvailableTimesForDay(schedule, selectedDate);
  }, [selectedDate, schedule]);

  // Generate options for startTime and endTime selects based on available times for the selected day
  // startTime options exclude the last slot, because it's the max time
  const startTimeOptions = availableTimesForDay.slice(0, -1);
  // endTime options include only times after the selected startTime
  const endTimeOptions = availableTimesForDay.filter((time) => time > startTime);

  // Reset endTime if it's invalid (earlier or equal to startTime)
  useEffect(() => {
    if (startTime && endTime && endTime <= startTime) {
      form.setValue('endTime', '');
    }
  }, [startTime, endTime, form]);

  const { isDirty } = form.formState;

  // Handle form submission to create or update an appointment
  const onSubmit = async (values) => {
    if (editAppointment) {
      if (!isDirty) {
        toast.warning('No se detectaron cambios.');
        return;
      }
    }

    // Build appointment object with formatted dates and times
    const appointment = {
      startTime: format(
        new Date(
          values.date.setHours(values.startTime.split(':')[0], values.startTime.split(':')[1])
        ),
        'dd-MM-yyyy HH:mm:ss'
      ),
      endTime: format(
        new Date(values.date.setHours(values.endTime.split(':')[0], values.endTime.split(':')[1])),
        'dd-MM-yyyy HH:mm:ss'
      ),
      reason: values.reason.trim() === '' ? null : values.reason.trim(),
      patientId: values.patient,
      medicId,
    };

    // Call the appropriate mutation based on edit mode
    if (editAppointment) {
      updateAppointmentMutation.mutate({
        id: appointmentToEdit.id,
        appointment,
      });
    } else {
      createAppointmentMutation.mutate(appointment);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        {/* Patient selector or input if editing */}
        <FormField
          control={form.control}
          name='patient'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paciente</FormLabel>
              <FormControl>
                {editAppointment ? (
                  <div>
                    <Input
                      placeholder={`${appointmentToEdit.patient.firstName} ${appointmentToEdit.patient.lastName}`}
                      disabled
                    />
                    <Input {...field} disabled className='hidden' />
                  </div>
                ) : (
                  <SearchPatients onSelectPatient={(id) => field.onChange(id)} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date selector with disabled days */}
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='mt-1'>Fecha</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPPP') : <span>Seleccionar...</span>}
                      <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const day = date.getDay(); // 0 = Sunday, ..., 6 = Saturday
                      const today = new Date();
                      if (date < today) return true; // disable past dates
                      return hiddenDays.includes(day); // disable hidden days from schedule
                    }}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time selectors */}
        <div className='flex flex-col space-y-2.5 md:flex-row md:gap-2.5 md:space-y-0'>
          {/* Start time */}
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Hora inicial</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn('font-normal', !field.value && 'text-muted-foreground')}
                    >
                      <SelectValue placeholder='Seleccionar...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {startTimeOptions.map((time) => (
                      <SelectItem value={time} key={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End time */}
          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Hora final</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn('font-normal', !field.value && 'text-muted-foreground')}
                    >
                      <SelectValue placeholder='Seleccionar...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {endTimeOptions.map((time) => (
                      <SelectItem value={time} key={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Reason for appointment (optional) */}
        <FormField
          control={form.control}
          name='reason'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo de cita (opcional)</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <div className='pt-5 md:flex md:justify-center'>
          <Button
            type='submit'
            disabled={createAppointmentMutation.isPending}
            className='w-full md:w-fit'
          >
            {editAppointment ? 'Guardar cambios' : 'Crear cita'}
            {createAppointmentMutation.isPending && <Loader2 className='me-2 animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
