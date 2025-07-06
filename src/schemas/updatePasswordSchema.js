import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Contraseña actual requerida' }),
    newPassword: z
      .string()
      .min(1, { message: 'Contraseña nueva requerida' })
      .refine(
        (val) => {
          const hasMinLength = val.length >= 8;
          const hasUpperCase = /[A-Z]/.test(val);
          const hasLowerCase = /[a-z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          const hasSymbol = /[!@#$%&*]/.test(val);
          return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
        },
        {
          message:
            'Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo !@#$%&*',
        }
      ),
    confirmNewPassword: z
      .string()
      .min(1, { message: 'Confirmación de contraseña nueva requerida' }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        path: ['confirmNewPassword'],
        message: 'Las contraseñas no coinciden',
      });
    }
  });
