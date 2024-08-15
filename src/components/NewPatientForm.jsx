import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
import { Input } from '@/components/ui/input';
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

import { toast } from 'sonner';

import { RotatingLines } from 'react-loader-spinner';

import { CalendarDots, Plus } from '@phosphor-icons/react';

import { PhoneInput } from '@/components/PhoneInput';

import { userInfoSchema } from '@/utils/formSchema';

const NewPatientForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dniType: '',
      dni: '',
      occupation: '',
      email: '',
      dob: null,
      phone: '',
      address: '',
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

      // Post request
      const req = await axios.post(
        'http://localhost:3000/api/v1/patient',
        {
          ...values,
          dob: format(values.dob, 'dd-MM-yyyy'),
          medicId: sessionStorage.getItem('id'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (req.status === 201) {
        toast.success('¡Enhorabuena!', {
          description: 'Paciente creado con éxito.',
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        toast.error('Oops...', {
          description: 'El paciente ya existe.',
        });
      } else {
        toast.error('Oops...', {
          description: 'Error al crear paciente.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
          <div className='flex flex-col space-y-2.5 md:flex-row md:gap-2.5 md:space-y-0'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='dniType'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Tipo de documento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                    <SelectItem value='cedula'>Cédula</SelectItem>
                    <SelectItem value='ruc'>RUC</SelectItem>
                    <SelectItem value='passport'>Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dni'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Nº de documento</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='occupation'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Ocupación</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='mt-1'>Fecha de nacimiento</FormLabel>
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
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccionar...</span>
                        )}
                        <CalendarDots
                          weight='bold'
                          className='ml-auto h-4 w-4 opacity-50'
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      captionLayout='dropdown'
                      toYear={2010}
                      fromYear={1940}
                      defaultMonth={new Date(1987, 7)}
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nº Celular</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-5 md:flex md:justify-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full md:w-fit'
            >
              Crear nuevo paciente
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

export default NewPatientForm;
