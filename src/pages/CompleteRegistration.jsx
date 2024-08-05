import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { cn } from '@/lib/utils';
import { format, parseISO, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
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
import { Toaster } from '@/components/ui/sonner';

import { toast } from 'sonner';

import { TimePicker } from 'antd';

import { RotatingLines } from 'react-loader-spinner';

import { CalendarDots } from '@phosphor-icons/react';

import { userInfoSchema } from '@/utils/formSchema';
import { PhoneInput } from '@/components/PhoneInput';

setDefaultOptions({ locale: es });

const specialties = [
  {
    id: 'accupuncture',
    label: 'Acupuntura',
  },
  {
    id: 'dermatology',
    label: 'Dermatología',
  },
  {
    id: 'nutrition',
    label: 'Nutrición',
  },
  {
    id: 'oral-rehab',
    label: 'Rehabilitación Oral',
  },
  {
    id: 'orthodontics',
    label: 'Ortodoncia',
  },
  {
    id: 'surgery',
    label: 'Cirugía',
  },
];

const days = [
  {
    id: 'lunes',
    label: 'Lunes',
  },
  {
    id: 'martes',
    label: 'Martes',
  },
  {
    id: 'miercoles',
    label: 'Miércoles',
  },
  {
    id: 'jueves',
    label: 'Jueves',
  },
  {
    id: 'viernes',
    label: 'Viernes',
  },
  {
    id: 'sabado',
    label: 'Sábado',
  },
];

const CompleteRegistration = () => {
  const navigate = useNavigate();

  // Loading with React Spinners
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable 00:00 to 07:00, 13:00, 20:00 to 23:00
  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 13, 20, 21, 22, 23],
  });

  const form = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      dniType: '',
      dni: '',
      firstName: '',
      lastName: '',
      dob: null,
      phone: '',
      address: '',
      registry: '',
      speciality: [],
      days: [],
      hours: [],
    },
  });

  const onSubmit = async (values) => {
    try {
      //   // Check auth
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Oops!', {
          description: `Error de autenticación.`,
        });
      }

      // Define the object to send to userData
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        dniType: values.dniType,
        dni: values.dni,
        dob: format(values.dob, 'dd-MM-yyyy'),
        phone: values.phone,
        address: values.address,
      };

      // Define the object to send to medicData
      const medicData = {
        registry: values.registry,
        speciality: values.speciality,
        days: values.days,
        checkIn:
          format(parseISO(values.hours?.[0]), 'dd-MM-yyyy HH:mm:ss') || '',
        checkOut:
          format(parseISO(values.hours?.[1]), 'dd-MM-yyyy HH:mm:ss') || '',
      };

      const [response1, response2] = await Promise.all([
        axios.post('http://localhost:3000/api/v1/user-info', userData, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post('http://localhost:3000/api/v1/medic-info', medicData, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Show loading React Spinners
      setIsSubmitting(true);

      if (
        response1 &&
        response2 &&
        response1.status === 201 &&
        response2.status === 201
      ) {
        form.reset();

        toast.success('¡Enhorabuena!', {
          description: 'Se ha guardado la información.',
        });
        toast.info('Redireccionando...', {
          description: 'Por favor espere.',
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error interno del servidor.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster
        position='bottom-right'
        theme='light'
        richColors
        toastOptions={{}}
        expand
        visibleToasts={2}
      />

      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Completar registro</h1>
        <p className='mb-5'>Por favor, llene la información solicitada.</p>

        <Carousel className='w-2/3 md:w-1/3'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CarouselContent className='items-center'>
                <CarouselItem className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Nombre'
                            className='h-10 text-lg'
                            {...field}
                          />
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
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Apellido'
                            className='h-10 text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='dniType'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`h-10 text-lg ${
                                field.value ? 'text-black' : 'text-slate-500'
                              }`}
                            >
                              <SelectValue placeholder='Tipo de documento' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='cedula' className='text-lg'>
                              Cédula
                            </SelectItem>
                            <SelectItem value='ruc' className='text-lg'>
                              RUC
                            </SelectItem>
                            <SelectItem value='passport' className='text-lg'>
                              Pasaporte
                            </SelectItem>
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
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Nº de documento'
                            className='h-10 text-lg'
                            {...field}
                          />
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
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal h-10 text-lg',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Fecha de nacimiento</span>
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
                                date > new Date() ||
                                date < new Date('1900-01-01')
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
                        <FormControl>
                          <PhoneInput placeholder='Celular' {...field} />
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
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Dirección'
                            className='h-10 text-lg'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CarouselItem>

                <CarouselItem className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='registry'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Registro'
                            className='h-10 text-lg'
                            {...field}
                          />
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
                        <FormLabel className='text-lg font-normal text-slate-500'>
                          Especialidad
                        </FormLabel>
                        <div className='px-2 lg:grid lg:grid-cols-3 lg:gap-2'>
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
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
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
                        <FormLabel className='text-lg font-normal text-slate-500'>
                          Días de trabajo
                        </FormLabel>
                        <div className='px-2 lg:grid lg:grid-cols-3 lg:gap-2'>
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
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
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
                    name='hours'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <FormLabel className='text-lg font-normal text-slate-500'>
                              Horario de atención
                            </FormLabel>

                            <TimePicker.RangePicker
                              className='w-full'
                              placeholder={['Inicio', 'Fin']}
                              disabledTime={disabledTime}
                              size='large'
                              format='HH:mm'
                              minuteStep={15}
                              onChange={(value) => {
                                // Convert Day.js object to ISO string so it can be validated by Zod
                                const isoValues = value.map((v) =>
                                  v.toISOString()
                                );

                                field.onChange(isoValues);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='pt-5'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full h-10 text-xl'
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
                </CarouselItem>
              </CarouselContent>
            </form>
          </Form>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default CompleteRegistration;
