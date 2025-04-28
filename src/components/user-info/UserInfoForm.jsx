import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { format, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarDays, Loader2 } from 'lucide-react';

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
import { PhoneInput } from '@/components/interaction/PhoneInput';

import { useUserInfo } from '@/hooks';
import { userInfoSchema } from '@/schemas/userInfoSchema';
import { cn } from '@/lib/utils';

export const UserInfoForm = () => {
  setDefaultOptions({ locale: es });

  const { createUserInfoMutation } = useUserInfo();

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

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    createUserInfoMutation.mutate(values);
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

        <div className='flex flex-col gap-2.5 md:flex-row'>
          <FormField
            control={form.control}
            name='dniType'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Tipo de documento</FormLabel>
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
        </div>

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
                      <CalendarDays
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
            disabled={createUserInfoMutation.isPending}
            className='w-full md:w-fit'
          >
            Guardar cambios
            {createUserInfoMutation.isPending && (
              <Loader2 className='ml-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
