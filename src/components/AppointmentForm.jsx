import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'sonner';
import { CalendarDays } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import SearchPatients from '@/components/SearchPatients';

import { cn } from '@/lib/utils';
import { newAppointmentSchema } from '@/utils/appointmentSchema';

import { appointmentStore } from '@/store/appointmentStore';
import useAppointments from '@/hooks/useAppointments';

const AppointmentForm = () => {
  setDefaultOptions({ locale: es });

  const medicId = sessionStorage.getItem('id');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setDialogOpen = appointmentStore((state) => state.setDialogOpen);
  const appointmentDate = appointmentStore((state) => state.appointmentDate);
  const appointmentStartTime = appointmentStore(
    (state) => state.appointmentStartTime
  );

  const { appointmentsQuery } = useAppointments();

  const form = useForm({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      date: appointmentDate,
      startTime: appointmentStartTime === '00:00' ? '' : appointmentStartTime,
      endTime: '',
      // reason: '',
      patient: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      // Check auth
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
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

      const res = await fetch('http://localhost:3000/api/v1/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointment),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error('Error creating appointment');
      }

      setDialogOpen(false);
      appointmentsQuery.refetch();
      toast.success('¡Enhorabuena!', {
        description: 'Cita creada con éxito.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error al crear la cita.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <SearchPatients
                    onSelectPatient={(id) => field.onChange(id)}
                  />
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
              disabled={isSubmitting}
              className='w-full md:w-fit'
            >
              Crear cita
              {isSubmitting && (
                <span className='ms-2'>
                  <RotatingLines
                    visible={true}
                    height='20'
                    width='20'
                    strokeColor='#FFF'
                    strokeWidth={5}
                    animationDuration='0.75'
                    ariaLabel='rotating-lines-loading'
                  />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AppointmentForm;
