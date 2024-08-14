import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format, parseISO, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeRangePicker from '@/components/TimeRangePicker';
import { PhoneInput } from '@/components/PhoneInput';

import { CalendarDots } from '@phosphor-icons/react';

import { medicInfoSchema, userInfoSchema } from '@/utils/formSchema';

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

const Profile = () => {
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
    },
  });

  const medicInfoForm = useForm({
    resolver: zodResolver(medicInfoSchema),
    defaultValues: {
      registry: '',
      speciality: [],
      days: [],
      hours: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialUserValues, setInitialUserValues] = useState(null);
  const [initialMedicValues, setInitialMedicValues] = useState(null);
  const [dniDisabled, setDniDisabled] = useState(false);
  const [registryDisabled, setRegistryDisabled] = useState(false);
  const [tabValue, setTabValue] = useState('userInfo');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Check auth
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Oops!', {
            description: 'Error de autenticación.',
          });

          return;
        }

        if (tabValue === 'userInfo') {
          const res = await axios.get(
            'http://localhost:3000/api/v1/user-info',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.status === 200) {
            const userData = {
              firstName: res?.data?.firstName || '',
              lastName: res?.data?.lastName || '',
              dniType: res?.data?.dniType || '',
              dni: res?.data?.dni || '',
              dob: res?.data?.dob ? new Date(res?.data?.dob) : null,
              phone: res?.data?.phone || '',
              address: res?.data?.address || '',
            };

            setInitialUserValues(userData);
            form.reset(userData); // Load data in the form fields
            setDniDisabled(true);
          }
        } else if (tabValue === 'medicInfo') {
          const res = await axios.get(
            'http://localhost:3000/api/v1/medic-info',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.status === 200) {
            const medicData = {
              registry: res?.data?.registry || '',
              speciality: res?.data?.speciality || [],
              days: res?.data?.days || [],
              checkIn: res?.data?.checkIn ? new Date(res?.data?.checkIn) : null,
              checkOut: res?.data?.checkOut
                ? new Date(res?.data?.checkOut)
                : null,
            };

            setInitialMedicValues(medicData);
            medicInfoForm.reset(medicData);
            setRegistryDisabled(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [form, medicInfoForm, tabValue]);

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

      if (initialUserValues) {
        // Update

        // Compare if the values have changed
        const currentValues = form.getValues();
        const hasChanges =
          JSON.stringify(currentValues) !== JSON.stringify(initialUserValues);

        if (!hasChanges) {
          toast.warning('Oops!', {
            description: 'No se detectaron cambios.',
          });
          return;
        }

        const res = await axios.patch(
          'http://localhost:3000/api/v1/user-info',
          { ...values, dob: format(values.dob, 'dd-MM-yyyy') },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          toast.success('¡Enhorabuena!', {
            description: 'Información actualizada con éxito.',
          });

          // Set new current values after editing
          setInitialUserValues(currentValues);
        }
      } else {
        // New entry
        const res = await axios.post(
          'http://localhost:3000/api/v1/user-info',
          { ...values, dob: format(values.dob, 'dd-MM-yyyy') },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 201) {
          toast.success('¡Enhorabuena!', {
            description: 'Información guardada con éxito.',
          });

          setInitialUserValues(values);
          setIsDisabled(true);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error al guardar la información.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit2 = async (values) => {
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

        // Taking out the 'hours' property
        const { hours, ...rest } = values;

        // Format the hours
        const medicInfo = {
          ...rest,
          checkIn:
            format(parseISO(values.hours?.[0]), 'dd-MM-yyyy HH:mm:ss') || '',
          checkOut:
            format(parseISO(values.hours?.[1]), 'dd-MM-yyyy HH:mm:ss') || '',
        };

        const res = await axios.post(
          'http://localhost:3000/api/v1/medic-info',
          medicInfo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 201) {
          toast.success('¡Enhorabuena!', {
            description: 'Información guardada con éxito.',
          });

          setInitialMedicValues(values);
          setRegistryDisabled(true);
        }
      } else {
        // Update

        // Taking out the 'hours' and 'registry properties
        const { hours, registry, ...rest } = values;

        // Format the hours
        const medicInfo = {
          ...rest,
          checkIn:
            format(parseISO(values.hours?.[0]), 'dd-MM-yyyy HH:mm:ss') || '',
          checkOut:
            format(parseISO(values.hours?.[1]), 'dd-MM-yyyy HH:mm:ss') || '',
        };

        // Compare if the values have changed
        const currentValues = medicInfoForm.getValues();

        const hasChanges =
          JSON.stringify(currentValues) !== JSON.stringify(initialMedicValues);

        if (!hasChanges) {
          toast.warning('Oops!', {
            description: 'No se detectaron cambios.',
          });
          return;
        }

        const res = await axios.patch(
          'http://localhost:3000/api/v1/user-info',
          medicInfo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          toast.success('¡Enhorabuena!', {
            description: 'Información actualizada con éxito.',
          });

          // Set new current values after editing
          setInitialMedicValues(currentValues);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error al guardar la información.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <Tabs
        defaultValue='userInfo'
        className='w-full md:w-fit'
        onValueChange={(value) => setTabValue(value)}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='userInfo'>Datos Personales</TabsTrigger>
          <TabsTrigger value='medicInfo'>Datos Profesionales</TabsTrigger>
        </TabsList>
        <TabsContent value='userInfo'>
          <Card>
            <CardContent className='p-5'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-2.5'
                >
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
                          value={field.value}
                          disabled={dniDisabled}
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
                          <Input
                            type='text'
                            disabled={dniDisabled}
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
                      <FormItem className='flex flex-col gap-1'>
                        <FormLabel className='mt-1'>
                          Fecha de nacimiento
                        </FormLabel>
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
                      Guardar datos
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='medicInfo'>
          <Card>
            <CardContent className='p-5'>
              <Form {...medicInfoForm}>
                <form
                  onSubmit={medicInfoForm.handleSubmit(onSubmit2)}
                  className='space-y-2.5'
                >
                  <FormField
                    control={medicInfoForm.control}
                    name='registry'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registro</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            disabled={registryDisabled}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={medicInfoForm.control}
                    name='speciality'
                    render={() => (
                      <FormItem>
                        <FormLabel>Especialidad</FormLabel>
                        <div className='px-2 md:grid md:grid-cols-3 md:gap-2'>
                          {specialties.map((item) => (
                            <FormField
                              key={item.id}
                              control={medicInfoForm.control}
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
                    control={medicInfoForm.control}
                    name='days'
                    render={() => (
                      <FormItem>
                        <FormLabel>Días de trabajo</FormLabel>
                        <div className='px-2 md:grid md:grid-cols-3 md:gap-2'>
                          {days.map((item) => (
                            <FormField
                              key={item.id}
                              control={medicInfoForm.control}
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
                    control={medicInfoForm.control}
                    name='hours'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TimeRangePicker
                            // startHourValue={}
                            // endHourValue={}
                            startHour={8}
                            endHour={19}
                            blockedRanges={[[13, 15]]}
                            minuteStep={15}
                            onChange={(value) => {
                              const isoValues = value.map((v) => {
                                // Convert each value to ISO format
                                if (v) {
                                  const [hour, minute] = v.split(':');
                                  const now = new Date();
                                  now.setHours(hour, minute, 0, 0);
                                  return now.toISOString();
                                }
                                return '';
                              });

                              field.onChange(isoValues);
                            }}
                          />
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
                      Guardar datos
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
