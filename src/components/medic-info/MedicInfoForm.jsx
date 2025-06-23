import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { useMedicInfo } from '@/hooks';
import { medicInfoSchema } from '@/schemas';
import { specialties } from '@/constants';

export const MedicInfoForm = () => {
  setDefaultOptions({ locale: es });

  const { createMedicInfoMutation, medicInfoQuery, updateMedicInfoMutation } =
    useMedicInfo();

  const form = useForm({
    resolver: zodResolver(medicInfoSchema),
    defaultValues: {
      registry: '',
      speciality: '',
    },
  });

  useEffect(() => {
    if (medicInfoQuery.data) {
      form.reset(medicInfoQuery.data);
    }
  }, [medicInfoQuery.data]);

  const { isDirty } = form.formState;

  const onSubmit = async (values) => {
    if (medicInfoQuery.data) {
      if (!isDirty) {
        toast.warning('No se detectaron cambios.');
        return;
      }

      updateMedicInfoMutation.mutate(values);
    } else {
      createMedicInfoMutation.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-2.5 md:flex-row'>
          <FormField
            control={form.control}
            name='registry'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Registro médico</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='speciality'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Especialidad</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {specialties.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='pt-5 flex justify-center'>
          <Button
            type='submit'
            disabled={
              createMedicInfoMutation.isPending ||
              updateMedicInfoMutation.isPending
            }
            className='w-full md:w-fit'
          >
            {medicInfoQuery.data ? 'Actualizar' : 'Crear'}
            {createMedicInfoMutation.isPending && (
              <Loader2 className='ml-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
