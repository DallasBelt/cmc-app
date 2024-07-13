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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { CalendarDots } from '@phosphor-icons/react';
import { UserPlus } from '@phosphor-icons/react';

import { newPatientSchema } from '@/utils/formSchema';

const NewPatientForm = () => {
  const form = useForm({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      phone: '',
      address: '',
      dob: null,
    },
  });

  const onSubmit = async (values) => {
    const newPatient = {
      ...values,
      dob: format(values.dob, 'yyyy-MM-dd'),
    };
    console.log(newPatient);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
          <div className='space-y-2.5 md:flex md:gap-2.5 md:space-y-0'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nombre' {...field} className='h-10' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Apellido' {...field} className='h-10' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Correo electrónico'
                    {...field}
                    className='h-10'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    pattern='\d{10}'
                    maxLength='10'
                    placeholder='Identificación'
                    {...field}
                    className='h-10'
                  />
                </FormControl>
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
                  <Input
                    type='text'
                    pattern='\d{10}'
                    maxLength='10'
                    placeholder='Nº Celular'
                    {...field}
                    className='h-10'
                  />
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
                    {...field}
                    className='h-10'
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
                          'pl-3 h-10 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Fecha de nacimiento</span>
                        )}
                        <CalendarDots
                          size={24}
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

          <div className='flex justify-center'>
            <Button type='submit' className='mt-5'>
              <UserPlus size={24} className='me-1' />
              Crear paciente
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewPatientForm;
