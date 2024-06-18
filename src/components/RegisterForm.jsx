import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { FloppyDisk } from '@phosphor-icons/react';

import { newMedicSchema } from '@/formSchema';

const items = [
  {
    id: 'general',
    label: 'Medicina general',
  },
  {
    id: 'accupuncture',
    label: 'Acupuntura',
  },
  {
    id: 'dentistry',
    label: 'Odontología',
  },
  {
    id: 'dermatology',
    label: 'Dermatología',
  },
  {
    id: 'cosmiatry',
    label: 'Cosmiatría',
  },
  {
    id: 'nutrition',
    label: 'Nutrición',
  },
];

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(newMedicSchema),
    defaultValues: {
      name: '',
      id: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      items: ['general'],
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 flex flex-col'
      >
        <div className='flex space-x-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Nombres'
                    {...field}
                    className='h-10 grow'
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
        </div>

        <div className='flex space-x-3'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='tel'
                    maxlength='10'
                    pattern='[0-9]{10}'
                    placeholder='Teléfono'
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
        </div>

        <FormField
          control={form.control}
          name='id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento de identidad</FormLabel>
              <div className='flex space-x-3'>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex space-x-1'
                  >
                    <FormItem className='flex items-center space-x-1 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='c' />
                      </FormControl>
                      <FormLabel className='font-normal'>Cedula</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-1 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='r' />
                      </FormControl>
                      <FormLabel className='font-normal'>RUC</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-1 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='p' />
                      </FormControl>
                      <FormLabel className='font-normal'>Pasaporte</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <Input
                    type='text'
                    maxlength='10'
                    pattern='[0-9]{10}'
                    placeholder='0123456789'
                    {...field}
                    className='h-10'
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <div className='flex space-x-3'>
                <FormControl>
                  <Input placeholder='día' {...field} className='h-10' />
                </FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='h-10 text-slate-500'>
                      <SelectValue placeholder='mes' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='01'>Enero</SelectItem>
                    <SelectItem value='02'>Febrero</SelectItem>
                    <SelectItem value='03'>Marzo</SelectItem>
                    <SelectItem value='04'>Abril</SelectItem>
                    <SelectItem value='05'>Mayo</SelectItem>
                    <SelectItem value='06'>Junio</SelectItem>
                    <SelectItem value='07'>Julio</SelectItem>
                    <SelectItem value='08'>Agosto</SelectItem>
                    <SelectItem value='09'>Septiembre</SelectItem>
                    <SelectItem value='10'>Octubre</SelectItem>
                    <SelectItem value='11'>Noviembre</SelectItem>
                    <SelectItem value='12'>Diciembre</SelectItem>
                  </SelectContent>
                </Select>
                <FormControl>
                  <Input placeholder='año' {...field} className='h-10' />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel>Especialidad(es)</FormLabel>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex items-end space-x-1 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mx-auto'>
          <Button type='submit'>
            <FloppyDisk size={24} className='me-1' />
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
