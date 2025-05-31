import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { toast } from 'sonner';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';

import { useSchedule } from '@/hooks';
import { scheduleSchema } from '@/schemas';
import { days } from '@/constants';
import { generateTimeOptions } from '@/utils';
import { areDaysEqual } from '@/utils/validateShifts';
import { cn } from '@/lib/utils';

export const ScheduleForm = () => {
  setDefaultOptions({ locale: es });

  const MAX_SHIFTS = 5;

  const { createScheduleMutation, scheduleQuery, updateScheduleMutation } =
    useSchedule();

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      shifts: [{ checkIn: '', checkOut: '', days: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'shifts',
    control: form.control,
  });

  const fetchExistingSchedule = () => {
    const schedule = scheduleQuery.data?.[0];

    if (!schedule || !Array.isArray(schedule.shifts)) return null;

    return schedule.shifts.map((shift) => ({
      checkIn: shift.checkIn,
      checkOut: shift.checkOut,
      days: shift.days || [],
    }));
  };

  useEffect(() => {
    const schedule = fetchExistingSchedule();
    form.setValue(
      'shifts',
      schedule || [{ checkIn: '', checkOut: '', days: [] }]
    );
  }, [scheduleQuery.data, form]);

  useEffect(() => {
    fields.forEach((_, index) => {
      const checkIn = form.getValues(`shifts.${index}.checkIn`);
      const checkOut = form.getValues(`shifts.${index}.checkOut`);
      if (checkIn && checkOut && checkOut <= checkIn) {
        form.setValue(`shifts.${index}.checkOut`, '');
      }
    });
  }, [fields, form]);

  const handleAppendShift = () => {
    if (fields.length < MAX_SHIFTS) {
      append({ checkIn: '', checkOut: '', days: [] });
    } else {
      toast.error('No se puede agregar más de 5 turnos.');
    }
  };

  const handleRemoveShift = (index) => {
    if (index === 0) {
      toast.error('No se puede eliminar el primer turno.');
      return;
    }
    remove(index);
  };

  const onSubmit = async (values) => {
    const existingScheduleId = scheduleQuery.data?.[0]?.id;

    // If there's no schedule, create a new one
    if (!existingScheduleId) {
      createScheduleMutation.mutate({ shifts: values.shifts });
      return;
    }

    // Define current and new schedules for comparison
    const currentSchedule = scheduleQuery.data?.[0]?.shifts ?? [];
    const newShifts = values.shifts;

    // Compare the current schedule with the one in the form
    const areEqual =
      currentSchedule.length === newShifts.length &&
      currentSchedule.every((currentShift, index) => {
        const newShift = newShifts[index];
        return (
          currentShift.checkIn === newShift.checkIn &&
          currentShift.checkOut === newShift.checkOut &&
          areDaysEqual(currentShift.days, newShift.days)
        );
      });

    if (areEqual) {
      toast.info('No se detectaron cambios.');
      return;
    }

    // If changes are detected, update the schedule
    updateScheduleMutation.mutate({
      id: existingScheduleId,
      shifts: values.shifts,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {fields.map((shift, index) => (
          <div
            key={shift.id}
            className='border p-4 rounded-md space-y-2 bg-muted/50'
          >
            <div className='flex justify-between items-center'>
              <FormLabel className='text-base font-medium'>
                Turno {index + 1}
              </FormLabel>
              {index !== 0 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => handleRemoveShift(index)}
                >
                  <Trash2 className='w-4 h-4 text-red-500' />
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`shifts.${index}.days`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Días</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type='multiple'
                      variant='outline'
                      className='flex flex-col md:flex-row flex-wrap gap-2'
                      value={field.value || []}
                      onValueChange={field.onChange}
                    >
                      {days.map((day) => (
                        <ToggleGroupItem
                          key={day.id}
                          value={day.id}
                          className='data-[state=on]:bg-primary data-[state=on]:text-white w-full md:w-fit'
                        >
                          {day.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col md:flex-row gap-2'>
              <FormField
                control={form.control}
                name={`shifts.${index}.checkIn`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Hora de entrada</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccionar...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='max-h-80 overflow-y-auto'>
                        {generateTimeOptions().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`shifts.${index}.checkOut`}
                render={({ field }) => {
                  const checkInValue = form.watch(`shifts.${index}.checkIn`);
                  const options = generateTimeOptions(6, 20, 15, checkInValue);

                  return (
                    <FormItem className='w-full'>
                      <FormLabel>Hora de salida</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!checkInValue}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(!checkInValue && 'opacity-50')}
                          >
                            <SelectValue placeholder='Seleccionar...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='max-h-80 overflow-y-auto'>
                          {options.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {form.formState.errors.shifts?.root?.message && (
              <p className='text-sm text-red-500 text-center'>
                {form.formState.errors.shifts.root.message}
              </p>
            )}
          </div>
        ))}

        <div className='flex justify-center'>
          <Button
            type='button'
            variant='outline'
            className='flex gap-2 items-center'
            disabled={fields.length >= MAX_SHIFTS}
            onClick={handleAppendShift}
          >
            <PlusCircle className='w-4 h-4 text-green-500' />
            Agregar otro turno
          </Button>
        </div>

        <div className='pt-5 flex justify-center'>
          <Button
            type='submit'
            disabled={createScheduleMutation.isPending}
            className='w-full md:w-fit'
          >
            Guardar cambios
            {createScheduleMutation.isPending && (
              <Loader2 className='ml-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
