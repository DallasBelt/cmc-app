import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { medicInfoSchema } from '@/utils/formSchema';
import { days, specialties } from '@/constants/medicInfoConstants';

const MedicInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCompleteInfo = location.pathname === '/complete-info';
  setDefaultOptions({ locale: es });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialMedicValues, setInitialMedicValues] = useState(null);
  const [fieldDisabled, setFieldDisabled] = useState(false);

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

  useEffect(() => {
    const fetchMedicInfo = async () => {
      try {
        // Check auth
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Oops!', {
            description: 'Error de autenticación.',
          });
          return;
        }

        const res = await fetch('http://localhost:3000/api/v1/medic-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await res.json();

        const medicData = {
          registry: data?.registry || '',
          speciality: data?.speciality || [],
          days: data?.days || [],
          checkIn: data?.checkIn || '',
          checkOut: data?.checkOut || '',
        };

        setInitialMedicValues(medicData);
        form.reset(medicData);
        setFieldDisabled(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicInfo();
  }, [form]);

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

      if (!initialMedicValues) {
        // New entry
        const res = await fetch('http://localhost:3000/api/v1/medic-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData);
          throw new Error();
        }

        if (isCompleteInfo) navigate('/');

        toast.success('¡Enhorabuena!', {
          description: 'Información guardada con éxito.',
        });

        setInitialMedicValues(values);
        setFieldDisabled(true);
      } else {
        // Update

        // Taking out the 'registry' property
        const { registry, ...rest } = values;

        // Compare if the values have changed
        const currentValues = form.getValues();

        const hasChanges =
          JSON.stringify(currentValues) !== JSON.stringify(initialMedicValues);

        if (!hasChanges) {
          toast.warning('Oops!', {
            description: 'No se detectaron cambios.',
          });
          return;
        }

        const res = await fetch('http://localhost:3000/api/v1/user-info', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rest),
        });

        if (!res.ok) {
          throw new Error('Error en la solicitud');
        }

        toast.success('¡Enhorabuena!', {
          description: 'Información actualizada con éxito.',
        });

        // Set new current values after editing
        setInitialMedicValues(currentValues);
      }
    } catch (error) {
      toast.error('Oops...', {
        description: 'Error al guardar la información.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          render={() => (
            <FormItem>
              <FormLabel>Especialidad</FormLabel>
              <div className='px-2 md:grid md:grid-cols-3 md:gap-2'>
                {specialties.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='speciality'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-normal'>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='days'
          render={() => (
            <FormItem>
              <FormLabel>Días de trabajo</FormLabel>
              <div className='px-2 md:grid md:grid-cols-3 md:gap-2'>
                {days.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='days'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-normal'>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
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
            disabled={isSubmitting}
            className='w-full md:w-fit'
          >
            Guardar
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
  );
};

export default MedicInfoForm;
