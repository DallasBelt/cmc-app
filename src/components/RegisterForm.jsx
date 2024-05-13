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
import { registerSchema } from '@/pages/LoginPage/schema';

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      id: '',
      dob: '',
      phone: '',
      address: '',
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Contraseña' {...field} className='h-10' />
              </FormControl>
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
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='c' />
                      </FormControl>
                      <FormLabel className='font-normal'>Cedula</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='r' />
                      </FormControl>
                      <FormLabel className='font-normal'>RUC</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='p' />
                      </FormControl>
                      <FormLabel className='font-normal'>Pasaporte</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <Input placeholder='0123456789' {...field} className='h-10' />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex space-x-3'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='w-1/3'>
                <FormControl>
                  <Input
                    type='tel'
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
              <FormItem className='w-2/3'>
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

        <div className='mx-auto'>
          <Button
            type='submit'
            className='h-10 text-xl mt-5 bg-green-600 hover:bg-green-500'
          >
            Registrarse
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
