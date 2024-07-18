import { z } from 'zod';

import { ecIdValidator } from '@/utils/ecIdValidator';
import { ecPhoneNumberValidator } from '@/utils/ecPhoneNumberValidator';

export const registrationSchema = z
  .object({
    // firstName: z.string().min(1, { message: 'Nombre requerido' }),
    // lastName: z.string().min(1, { message: 'Apellido requerido' }),
    email: z
      .string()
      .min(1, { message: 'Correo electrónico requerido' })
      .email({ message: 'Correo electrónico no válido' }),
    password: z
      .string()
      .min(1, { message: 'Contraseña requerida' })
      .refine(
        (val) => {
          const hasMinLength = val.length >= 8;
          const hasUpperCase = /[A-Z]/.test(val);
          const hasLowerCase = /[a-z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          const hasSymbol = /[!@#$%&*]/.test(val);
          return (
            hasMinLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSymbol
          );
        },
        {
          message:
            'Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo !@#$%&*',
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmación de contraseña requerida' }),
    // dob: z
    //   .date()
    //   .nullable()
    //   .refine((val) => val !== null, {
    //     message: 'Fecha de nacimiento requerida',
    //   }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Las contraseñas no coinciden',
      });
    }
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
  id: z
    .string()
    .min(1, 'Identificación requerida')
    .max(10)
    .refine((val) => ecIdValidator(val), {
      message: 'Identificación inválida',
    }),
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  phone: z
    .string()
    .min(1, 'Nº celular requerido')
    .max(10)
    .refine((val) => ecPhoneNumberValidator(val), {
      message: 'Número celular inválido',
    }),
  address: z.string().min(1, 'Dirección requerida'),
  dob: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Fecha de nacimiento requerida',
    }),
});
