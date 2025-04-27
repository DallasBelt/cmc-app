import { z } from 'zod';

export const scheduleSchema = z
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
