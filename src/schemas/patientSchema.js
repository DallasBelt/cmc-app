import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { validateCedula, validateRuc, validatePassport } from '@/utils';

export const newPatientSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Nombre requerido' }),
    lastName: z.string().min(1, { message: 'Apellido requerido' }),
    dniType: z.string().min(1, { message: 'Tipo de documento requerido' }),
    dni: z.string().min(1, { message: 'Nº de documento requerido' }),
    occupation: z.string().min(1, { message: 'Ocupación requerida' }),
    email: z
      .string()
      .min(1, { message: 'Correo electrónico requerido' })
      .email('Correo electrónico no válido')
      .optional(),
    dob: z
      .date()
      .nullable()
      .refine((val) => val !== null, {
        message: 'Fecha de nacimiento requerida',
      }),
    phone: z
      .string()
      .min(1, { message: 'Número celular requerido' })
      .refine((val) => isValidPhoneNumber(val), {
        message: 'Número celular inválido',
      }),
    address: z.string().min(1, { message: 'Dirección requerida' }),
  })
  .superRefine((data, ctx) => {
    if (data.dniType === 'cedula' && !validateCedula(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para cédula',
        path: ['dni'],
      });
    } else if (data.dniType === 'ruc' && !validateRuc(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para RUC',
        path: ['dni'],
      });
    } else if (data.dniType === 'passport' && !validatePassport(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para pasaporte',
        path: ['dni'],
      });
    }
  });

export const editPatientSchema = z.object({
  firstName: z.string().min(1, { message: 'Nombre requerido' }),
  lastName: z.string().min(1, { message: 'Apellido requerido' }),
  occupation: z.string().min(1, { message: 'Ocupación requerida' }),
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email('Correo electrónico no válido'),
  dob: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Fecha de nacimiento requerida',
    }),
  phone: z
    .string()
    .min(1, { message: 'Número celular requerido' })
    .refine((val) => isValidPhoneNumber(val), {
      message: 'Número celular inválido',
    }),
  address: z.string().min(1, { message: 'Dirección requerida' }),
});
