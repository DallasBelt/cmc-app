import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
  cedulaValidator,
  rucValidator,
  passportValidator,
} from '@/utils/idValidators';

export const userInfoSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Nombre requerido' }),
    lastName: z.string().min(1, { message: 'Apellido requerido' }),
    dniType: z.string().min(1, { message: 'Tipo de documento requerido' }),
    dni: z.string().min(1, { message: 'Nº de documento requerido' }),
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
    if (data.dniType === 'cedula' && !cedulaValidator(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para cédula',
        path: ['dni'],
      });
    } else if (data.dniType === 'ruc' && !rucValidator(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para RUC',
        path: ['dni'],
      });
    } else if (data.dniType === 'passport' && !passportValidator(data.dni)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nº de documento inválido para pasaporte',
        path: ['dni'],
      });
    }
  });
