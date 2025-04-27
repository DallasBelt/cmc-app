import { z } from 'zod';
import { scheduleSchema } from '@/schemas/scheduleSchema';
import { getScheduleIssues } from '@/utils/scheduleValidators';

export const medicInfoSchema = z
  .object({
    registry: z.string().min(1, { message: 'Registro requerido' }),

    speciality: z
      .array(z.string())
      .nonempty({ message: 'Seleccione al menos una especialidad' }),

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
