import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'Ingrese su nombre' }),
  lastName: z.string().min(1, { message: 'Ingrese su appellido' }),
  email: z
    .string()
    .min(1, { message: 'Ingrese su correo' })
    .email({ message: 'Correo no válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  id: z.string(),
  dob: z.date(),
  phone: z.string(),
  address: z.string(),
});
