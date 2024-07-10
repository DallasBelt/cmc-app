import { add } from 'date-fns';
import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
  dob: z.date('Fecha no válida'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export const newPatientSchema = z.object({
  firstName: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellido requerido'),
  id: z.string().min(1, 'ID requerido').max(10),
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  phone: z.string().min(1, 'Teléfono requerido').max(10),
  address: z.string().min(1, 'Dirección requerida'),
  dob: z.date('Fecha no válida'),
});
