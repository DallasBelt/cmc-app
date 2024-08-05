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

import { patientSchema } from '@/utils/formSchema';

const NewPatientForm = () => {
  // Loading with React Spinners
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dniType: '',
      dni: '',
      email: '',
      dob: null,
      phone: '',
      address: '',
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
          <div className='flex flex-col space-y-2.5 md:flex-row md:gap-2.5 md:space-y-0'>
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
          </div>

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
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Correo electrónico'
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

          <div className='pt-5 md:flex md:justify-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full h-10 text-xl md:w-fit'
            >
              Crear
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
