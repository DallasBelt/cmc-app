import { z } from 'zod';
import { getScheduleIssues } from '@/utils/scheduleValidators';

const scheduleSchema = z
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

    days: z.array(z.string()).min(1, { message: 'Seleccione al menos un día' }),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'La hora de salida debe ser mayor que la de entrada',
    path: ['checkOut'],
  });

export const schedulesArraySchema = z
  .object({
    schedules: z
      .array(scheduleSchema)
      .min(1, { message: 'Debe registrar al menos un horario' }),
  })
  .superRefine((data, ctx) => {
    const { hasDuplicates, hasOverlaps } = getScheduleIssues(data.schedules);

    if (hasDuplicates && hasOverlaps) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay horarios duplicados y traslapados.',
        path: ['schedules'],
      });
    } else if (hasDuplicates) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay horarios duplicados.',
        path: ['schedules'],
      });
    } else if (hasOverlaps) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hay horarios que se traslapan.',
        path: ['schedules'],
      });
    }
  });
