import { z } from 'zod';
import { validateShifts } from '@/utils';

const validDays = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

const shiftSchema = z
  .object({
    checkIn: z
      .string()
      .min(1, { message: 'Hora de entrada no válida' })
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'Formato inválido (HH:mm)',
      }),

    checkOut: z
      .string()
      .min(1, { message: 'Hora de salida no válida' })
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'Formato inválido (HH:mm)',
      }),

    days: z.array(validDays).min(1, { message: 'Seleccione al menos un día' }),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'La hora de salida debe ser mayor que la de entrada',
    path: ['checkOut'],
  });

export const scheduleSchema = z
  .object({
    shifts: z
      .array(shiftSchema)
      .min(1, { message: 'Debe registrar al menos un turno.' }),
  })
  .superRefine((data, ctx) => {
    const { hasDuplicateShifts, hasOverlappedShifts } = validateShifts(
      data.shifts
    );

    if (hasDuplicateShifts && hasOverlappedShifts) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay turnos duplicados y traslapados.',
        path: ['shifts'],
      });
    } else if (hasDuplicateShifts) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay turnos duplicados.',
        path: ['shifts'],
      });
    } else if (hasOverlappedShifts) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay turnos que se traslapan.',
        path: ['shifts'],
      });
    }
  });
