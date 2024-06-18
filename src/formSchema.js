import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export const newMedicSchema = z.object({
  name: z.string().min(1, { message: 'Ingrese el nombre del médico' }),
  email: z
    .string()
    .min(1, { message: 'Ingrese el correo del médico' })
    .email({ message: 'Correo no válido' }),
  phone: z
    .string()
    .min(1, { message: 'Ingrese el teléfono del médico' })
    .max(10),
  address: z.string().min(1, { message: 'Ingrese la dirección del médico' }),
  id: z.string().min(1, { message: 'Ingrese su identificación' }).max(10),
  dob: z.date(),
  specialty: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});
