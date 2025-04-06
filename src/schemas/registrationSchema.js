import { z } from 'zod';

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
