import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import login from '@/assets/login.jpg';
import logo from '@/assets/logo.svg';
import loginSchema from './schema';

function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values) {
    try {
      const response = await axios.post('http://localhost:8000/v1/user/login', values);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <img src={logo} className='w-48 my-5 mx-auto'/>
    
      <div className='flex flex-col items-center md:flex-row md:justify-center'>
        <img src={login} alt='' className='hidden lg:block lg:w-2/4 xl:w-2/6'/>
        <div className='w-full sm:w-3/4 lg:w-2/4 xl:w-2/6 px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Correo electrónico" className='h-14 text-lg' {...field} />
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage>
                        {form.formState.errors.email.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Contraseña" className='h-14 text-lg' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full h-14 text-xl'>INICIAR SESIÓN</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;