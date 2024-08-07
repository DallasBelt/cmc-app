import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import {
  cedulaValidator,
  rucValidator,
  passportValidator,
} from '@/utils/customValidators';

export const registrationSchema = z
  .object({
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

export const userInfoSchema = z
  .object({
    dniType: z.string().min(1, { message: 'Tipo de documento requerido' }),
    dni: z.string().min(1, { message: 'Nº de documento requerido' }),
    firstName: z.string().min(1, { message: 'Nombre requerido' }),
    lastName: z.string().min(1, { message: 'Apellido requerido' }),
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
    registry: z.string().min(1, { message: 'Registro requerido' }).optional(),
    speciality: z
      .array(z.string())
      .optional()
      .refine((value) => value.some((item) => item), {
        message: 'Seleccione al menos una especialidad',
      }),
    days: z
      .array(z.string())
      .optional()
      .refine((value) => value.some((item) => item), {
        message: 'Seleccione al menos un día',
      }),
    hours: z
      .array(z.string())
      .length(2, 'Seleccione un rango de inicio y fin')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dniType === 'cedula') {
      if (!cedulaValidator(data.dni)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nº de documento inválido para cédula',
          path: ['dni'],
        });
      }
    } else if (data.dniType === 'ruc') {
      if (!rucValidator(data.dni)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nº de documento inválido para RUC',
          path: ['dni'],
        });
      }
    } else if (data.dniType === 'passport') {
      if (!passportValidator(data.dni)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nº de documento inválido para pasaporte',
          path: ['dni'],
        });
      }
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Tipo de documento no soportado',
        path: ['dniType'],
      });
    }
  });

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: 'Nombre requerido' }),
  lastName: z.string().min(1, { message: 'Apellido requerido' }),
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

export const patientSchema = z.object({
  firstName: z.string().min(1, { message: 'Nombre requerido' }),
  lastName: z.string().min(1, { message: 'Apellido requerido' }),
  dniType: z.string().min(1, { message: 'Tipo de documento requerido' }),
  dni: z.string().min(1, { message: 'Nº de documento requerido' }),
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email({ message: 'Correo electrónico no válido' }),
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
