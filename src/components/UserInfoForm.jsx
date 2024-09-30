import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

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
import { PhoneInput } from '@/components/PhoneInput';

import { CalendarDots } from '@phosphor-icons/react';

import { userInfoSchema } from '@/utils/formSchema';

const UserInfoForm = () => {
  setDefaultOptions({ locale: es });
  const location = useLocation();
  const isCompleteInfo = location.pathname === '/complete-info';
  const role = sessionStorage.getItem('roles');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialUserValues, setInitialUserValues] = useState(null);
  const [fieldDisabled, setFieldDisabled] = useState(false);

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

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        // Check auth
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Oops!', {
            description: 'Error de autenticación.',
          });

          return;
        }

        const res = await fetch('http://localhost:3000/api/v1/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error fetching user info');
        }

        const data = await res.json();

        // Create userData object
        const userData = {
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          dniType: data?.dniType || '',
          dni: data?.dni || '',
          dob: data?.dob ? new Date(data?.dob) : null,
          phone: data?.phone || '',
          address: data?.address || '',
        };

        setInitialUserValues(userData);
        form.reset(userData); // Load data in the form fields
        setFieldDisabled(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfo();
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

        // If data has changed, make the HTTP patch request
        const res = await fetch('http://localhost:3000/api/v1/user-info', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            dob: format(values.dob, 'dd-MM-yyyy'),
          }),
        });

        if (!res.ok) {
          throw new Error('Error fetching user info');
        }

        toast.success('¡Enhorabuena!', {
          description: 'Información actualizada con éxito.',
        });

        // Set new current values after editing
        setInitialUserValues(currentValues);
      } else {
        // New entry
        const res = await fetch('http://localhost:3000/api/v1/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            dob: format(values.dob, 'dd-MM-yyyy'),
          }),
        });

        if (!res.ok) {
          throw new Error('Error fetching user info');
        }

        toast.success('¡Enhorabuena!', {
          description: 'Información guardada con éxito.',
        });

        setInitialUserValues(values);
        setFieldDisabled(true);
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
                value={field.value}
                disabled={fieldDisabled}
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
                <Input type='text' disabled={fieldDisabled} {...field} />
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
                    hideNavigation
                    toYear={new Date().getFullYear() - 18}
                    fromYear={new Date().getFullYear() - 70}
                    locale={es}
                    initialFocus
                    classNames={{
                      day_hidden: 'invisible',
                      dropdown:
                        'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                      caption_dropdowns: 'flex gap-3',
                      vhidden: 'hidden',
                      caption_label: 'hidden',
                    }}
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

export default UserInfoForm;
