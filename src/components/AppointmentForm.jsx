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
  SearchPatients,
} from '@/components';

import { useAppointments } from '@/hooks';
import { useAppointmentStore } from '@/store';

import { newAppointmentSchema } from '@/schemas';

export const AppointmentForm = () => {
  setDefaultOptions({ locale: es });

  const {
    appointmentsQuery,
    createAppointmentMutation,
    updateAppointmentMutation,
  } = useAppointments();

  const medicId = sessionStorage.getItem('id');

  const appointmentId = useAppointmentStore((state) => state.appointmentId);
  const appointmentDate = useAppointmentStore((state) => state.appointmentDate);
  const appointmentStartTime = useAppointmentStore(
    (state) => state.appointmentStartTime
  );
  const editAppointment = useAppointmentStore((state) => state.editAppointment);

  const appointmentToEdit = appointmentsQuery.data.data?.find(
    (a) => a.id === appointmentId
  );

  const form = useForm({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      date: editAppointment
        ? new Date(appointmentToEdit.startTime)
        : appointmentDate,
      startTime: editAppointment
        ? format(appointmentToEdit.startTime, 'HH:mm')
        : appointmentStartTime === '00:00'
        ? ''
        : appointmentStartTime,
      endTime: editAppointment
        ? format(appointmentToEdit.endTime, 'HH:mm')
        : '',
      // reason: '',
      patient: editAppointment ? appointmentToEdit.patient.id : '',
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    if (editAppointment) {
      if (!isDirty) {
        toast.warning('No se detectaron cambios.');
        return;
      }
    }
    const appointment = {
      startTime: format(
        new Date(
          values.date.setHours(
            values.startTime.split(':')[0],
            values.startTime.split(':')[1]
          )
        ),
        'dd-MM-yyyy HH:mm:ss'
      ),
      endTime: format(
        new Date(
          values.date.setHours(
            values.endTime.split(':')[0],
            values.endTime.split(':')[1]
          )
        ),
        'dd-MM-yyyy HH:mm:ss'
      ),
      patientId: values.patient,
      medicId,
    };

    editAppointment
      ? updateAppointmentMutation.mutate({
          id: appointmentToEdit.id,
          appointment,
        })
      : createAppointmentMutation.mutate(appointment);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
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
                      <Input {...field} disabled={true} className='hidden' />
                    </div>
                  ) : (
                    <SearchPatients
                      onSelectPatient={(id) => field.onChange(id)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='mt-1'>Fecha</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPPP')
                        ) : (
                          <span>Seleccionar...</span>
                        )}
                        <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col space-y-2.5 md:flex-row md:gap-2.5 md:space-y-0'>
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Hora inicial</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <SelectValue placeholder='Seleccionar...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }).flatMap((_, i) => {
                        const hour = i + 7;
                        const formattedHour =
                          hour < 10 ? `0${hour}` : `${hour}`;

                        return [
                          <SelectItem
                            value={`${formattedHour}:00`}
                            key={`${formattedHour}:00`}
                          >
                            {`${formattedHour}:00`}
                          </SelectItem>,
                          <SelectItem
                            value={`${formattedHour}:30`}
                            key={`${formattedHour}:30`}
                          >
                            {`${formattedHour}:30`}
                          </SelectItem>,
                        ];
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Hora final</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <SelectValue placeholder='Seleccionar...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }).flatMap((_, i) => {
                        const hour = i + 7;
                        const formattedHour =
                          hour < 10 ? `0${hour}` : `${hour}`;

                        return [
                          <SelectItem
                            value={`${formattedHour}:00`}
                            key={`${formattedHour}:00`}
                          >
                            {`${formattedHour}:00`}
                          </SelectItem>,
                          <SelectItem
                            value={`${formattedHour}:30`}
                            key={`${formattedHour}:30`}
                          >
                            {`${formattedHour}:30`}
                          </SelectItem>,
                        ];
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <FormField
            control={form.control}
            name='reason'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo de cita</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className='pt-5 md:flex md:justify-center'>
            <Button
              type='submit'
              disabled={createAppointmentMutation.isPending}
              className='w-full md:w-fit'
            >
              {editAppointment ? 'Guardar cambios' : 'Crear cita'}
              {createAppointmentMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
