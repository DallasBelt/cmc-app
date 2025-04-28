import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';

import { useMedicInfo } from '@/hooks';
import { medicInfoSchema } from '@/schemas';
import { days, specialties } from '@/constants';
import { generateTimeOptions } from '@/utils';
import { cn } from '@/lib/utils';

export const MedicInfoForm = () => {
  setDefaultOptions({ locale: es });

  const { createMedicInfoMutation } = useMedicInfo();

  const form = useForm({
    resolver: zodResolver(medicInfoSchema),
    defaultValues: {
      registry: '',
      speciality: '',
      schedules: [{ checkIn: '', checkOut: '', days: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'schedules',
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

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
    createMedicInfoMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-2.5 md:flex-row'>
          <FormField
            control={form.control}
            name='registry'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Registro médico</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='speciality'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Especialidad</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {specialties.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  onClick={() => remove(index)}
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
            disabled={fields.length >= 5}
            onClick={() => {
              append({ checkIn: '', checkOut: '', days: [] });
            }}
          >
            <PlusCircle className='w-4 h-4 text-green-500' />
            Agregar horario
          </Button>
        </div>

        <div className='pt-5 flex justify-center'>
          <Button
            type='submit'
            disabled={createMedicInfoMutation.isPending}
            className='w-full md:w-fit'
          >
            Guardar cambios
            {createMedicInfoMutation.isPending && (
              <Loader2 className='ml-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
