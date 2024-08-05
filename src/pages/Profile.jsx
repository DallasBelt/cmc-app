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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { RotatingLines } from 'react-loader-spinner';

import { CalendarDots } from '@phosphor-icons/react';

import { PhoneInput } from '@/components/PhoneInput';
import { personalInfoSchema } from '@/utils/formSchema';

setDefaultOptions({ locale: es });

const Profile = () => {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: null,
      phone: '',
      address: '',
    },
  });

  // Loading with React Spinners
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      // Check auth
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Oops!', {
          description: `Error de autenticación.`,
        });
      }

      // Define the object to send to userData
      const userData = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        dob: format(values?.dob, 'dd-MM-yyyy'),
        phone: values?.phone,
        address: values?.address,
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
    <div className='py-16 flex flex-col gap-5 items-center'>
      <h1 className='text-4xl'>Perfil</h1>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Personal</TabsTrigger>
          <TabsTrigger value='password'>Profesional</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Personal</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-2.5'
                >
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

                  <div className='pt-5'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full h-10 text-xl'
                    >
                      Guardar cambios
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
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Profesional</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
