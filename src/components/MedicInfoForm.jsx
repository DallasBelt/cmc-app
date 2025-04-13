import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { Loader2 } from 'lucide-react';

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
} from '@/components';

import { cn } from '@/lib/utils';

import { useMedicInfo } from '@/hooks';
import { medicInfoSchema } from '@/schemas';
import { days, specialties } from '@/constants';

export const MedicInfoForm = () => {
  setDefaultOptions({ locale: es });

  const navigate = useNavigate();
  const location = useLocation();

  const isCompleteInfo = location.pathname === '/complete-info';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialMedicValues, setInitialMedicValues] = useState(null);
  const [fieldDisabled, setFieldDisabled] = useState(false);

  const { createMedicInfoMutation } = useMedicInfo();

  const form = useForm({
    resolver: zodResolver(medicInfoSchema),
    defaultValues: {
      registry: '',
      speciality: [],
      days: [],
      checkIn: '',
      checkOut: '',
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormField
          control={form.control}
          name='registry'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registro</FormLabel>
              <FormControl>
                <Input type='text' disabled={fieldDisabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='speciality'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidad</FormLabel>
              <FormControl>
                <ToggleGroup
                  type='multiple'
                  variant='outline'
                  className='flex flex-col md:flex-row md:flex-wrap md:gap-2'
                  value={field.value || []}
                  onValueChange={field.onChange}
                >
                  {specialties.map((item) => (
                    <ToggleGroupItem
                      key={item.id}
                      value={item.id}
                      className='w-full md:w-auto data-[state=on]:bg-primary data-[state=on]:text-white border rounded-md px-4 py-2 text-sm text-center transition-colors'
                    >
                      {item.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='days'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Días de trabajo</FormLabel>
              <FormControl>
                <ToggleGroup
                  type='multiple'
                  variant='outline'
                  className='flex flex-col md:flex-row md:flex-wrap md:gap-2'
                  value={field.value || []}
                  onValueChange={field.onChange}
                >
                  {days.map((item) => (
                    <ToggleGroupItem
                      key={item.id}
                      value={item.id}
                      className='w-full md:w-auto data-[state=on]:bg-primary data-[state=on]:text-white border rounded-md px-4 py-2 text-sm text-center transition-colors'
                    >
                      {item.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-2.5 md:flex-row'>
          <FormField
            control={form.control}
            name='checkIn'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Inicio</FormLabel>
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
                    {Array.from({ length: 12 }).map((_, i) => {
                      const hour = i + 8; // Start from 08:00
                      const formattedHour =
                        hour < 10 ? `0${hour}:00` : `${hour}:00`;
                      return (
                        <SelectItem value={formattedHour} key={hour}>
                          {formattedHour}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='checkOut'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Fin</FormLabel>
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
                    {Array.from({ length: 12 }).map((_, i) => {
                      const hour = i + 8; // Start from 08:00
                      const formattedHour =
                        hour < 10 ? `0${hour}:00` : `${hour}:00`;
                      return (
                        <SelectItem value={formattedHour} key={hour}>
                          {formattedHour}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='pt-5 md:flex md:justify-center'>
          <Button
            type='submit'
            disabled={createMedicInfoMutation.isPending}
            className='w-full md:w-fit'
          >
            Guardar cambios
            {createMedicInfoMutation.isPending && (
              <Loader2 className='me-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
