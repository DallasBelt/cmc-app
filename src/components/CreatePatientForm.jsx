import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarDays, Loader2 } from 'lucide-react';

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

import { newPatientSchema, editPatientSchema } from '@/utils/patientSchema';

import { usePatients } from '@/hooks';
import { usePatientStore } from '@/store';

export const CreatePatientForm = () => {
  const editPatient = usePatientStore((state) => state.editPatient);
  // const [initialPatientValues, setInitialPatientValues] = useState(null);
  // const patientId = usePatientIdStore((state) => state.patientId);

  const schema = !editPatient ? newPatientSchema : editPatientSchema;

  const { createPatientMutation } = usePatients();

  const form = useForm({
    resolver: zodResolver(schema),
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
    const patient = {
      ...values,
      dob: format(values.dob, 'dd-MM-yyyy'),
      medicId: sessionStorage.getItem('id'),
    };

    createPatientMutation.mutate(patient);
    // try {
    //   setIsSubmitting(true);

    //   // Check auth
    //   const token = sessionStorage.getItem('token');
    //   if (!token) {
    //     toast.error('Oops!', {
    //       description: 'Error de autenticación.',
    //     });
    //     return;
    //   }

    //   if (!initialPatientValues) {
    //     // New entry

    //     // Post request to create a new patient
    //     const res = await axios.post(
    //       'http://localhost:3000/api/v1/patient',
    //       {
    //         ...values,
    //         dob: format(values.dob, 'dd-MM-yyyy'),
    //         medicId: sessionStorage.getItem('id'),
    //       },
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );

    //     if (res.status === 201) {
    //       toast.success('¡Enhorabuena!', {
    //         description: 'Paciente creado con éxito.',
    //       });

    //       form.reset();
    //       setModalState(false);
    //     }
    //   } else {
    //     // Get current form values
    //     const currentValues = form.getValues();

    //     // Exclude 'dni' and 'dniType' keys
    //     const { dni, dniType, ...rest } = currentValues;

    //     // Compare the values
    //     const hasChanges =
    //       JSON.stringify(rest) !== JSON.stringify(initialPatientValues);

    //     if (!hasChanges) {
    //       toast.warning('Oops!', {
    //         description: 'No se detectaron cambios.',
    //       });
    //       return;
    //     }

    //     // Patch request to update patient info
    //     const res = await axios.patch(
    //       `http://localhost:3000/api/v1/patient/${patientId}`,
    //       { ...rest, dob: format(values.dob, 'dd-MM-yyyy') },
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );

    //     if (res.status === 200) {
    //       toast.success('¡Enhorabuena!', {
    //         description: 'Información actualizada con éxito.',
    //       });

    //       // Set new current values after editing
    //       setInitialPatientValues(rest);
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    //   if (error.response.status === 400) {
    //     toast.error('Oops...', {
    //       description: 'El paciente ya existe.',
    //     });
    //   } else {
    //     toast.error('Oops...', {
    //       description: 'Error al crear paciente.',
    //     });
    //   }
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
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

          <div className={editPatient ? 'hidden' : 'flex'}>
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
          </div>

          <div className={editPatient ? 'hidden' : 'flex'}>
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
                      toYear={new Date().getFullYear() - 18}
                      fromYear={new Date().getFullYear() - 100}
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
              disabled={createPatientMutation.isPending}
              className='w-full md:w-fit'
            >
              {editPatient ? 'Guardar cambios' : 'Crear paciente'}
              {createPatientMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
