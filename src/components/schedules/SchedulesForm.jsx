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

import { useSchedules } from '@/hooks';
import { schedulesArraySchema } from '@/schemas';
import { days } from '@/constants';
import { generateTimeOptions } from '@/utils';
import { cn } from '@/lib/utils';

export const SchedulesForm = () => {
  setDefaultOptions({ locale: es });

  const MAX_SCHEDULES = 5;

  const { createScheduleMutation, schedulesQuery } = useSchedules();

  const form = useForm({
    resolver: zodResolver(schedulesArraySchema),
    defaultValues: {
      schedules: [{ checkIn: '', checkOut: '', days: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'schedules',
    control: form.control,
  });

  useEffect(() => {
    fields.forEach((_, index) => {
      const checkIn = form.getValues(`schedules.${index}.checkIn`);
      const checkOut = form.getValues(`schedules.${index}.checkOut`);

      if (checkIn && checkOut && checkOut <= checkIn) {
        form.setValue(`schedules.${index}.checkOut`, '');
      }
    });
  }, [fields, form]);

  const handleAppend = () => {
    if (fields.length < MAX_SCHEDULES) {
      append({ checkIn: '', checkOut: '', days: [] });
    } else {
      toast.error('No se puede agregar más de 5 horarios.');
    }
  };

  const handleRemove = (index) => {
    if (index === 0) {
      toast.error('No se puede eliminar el primer horario.');
      return;
    }
    remove(index);
  };

  // useEffect(() => {
  //   if (schedulesQuery.data) {
  //     form.reset(schedulesQuery.data);
  //   }
  // }, [schedulesQuery.data]);

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    console.log(values.schedules);
    // if (schedulesQuery.data) {
    //   if (!isDirty) {
    //     toast.info('No se detectaron cambios.');
    //     return;
    //   }

    //   updateMedicInfoMutation.mutate(values);
    // } else {
    //   createScheduleMutation.mutate(values);
    // }
    createScheduleMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {fields.map((schedule, index) => (
          <div
            key={schedule.id}
            className='border p-4 rounded-md space-y-2 bg-muted/50'
          >
            <div className='flex justify-between items-center'>
              <FormLabel className='text-base font-medium'>
                Horario {index + 1}
              </FormLabel>
              {index !== 0 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className='w-4 h-4 text-red-500' />
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`schedules.${index}.days`}
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
                name={`schedules.${index}.checkIn`}
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
                name={`schedules.${index}.checkOut`}
                render={({ field }) => {
                  const checkInValue = form.watch(`schedules.${index}.checkIn`);
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
            {form.formState.errors.schedules?.root?.message && (
              <p className='text-sm text-red-500 text-center'>
                {form.formState.errors.schedules.root.message}
              </p>
            )}
          </div>
        ))}

        <div className='flex justify-center'>
          <Button
            type='button'
            variant='outline'
            className='flex gap-2 items-center'
            disabled={fields.length >= MAX_SCHEDULES}
            onClick={handleAppend}
          >
            <PlusCircle className='w-4 h-4 text-green-500' />
            Agregar horario
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
