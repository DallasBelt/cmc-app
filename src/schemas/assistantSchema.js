import { z } from 'zod';

export const assistantInfoSchema = z
  .object({
    medic: z.string().uuid({ message: 'Médico no válido' }),
    days: z.array(z.string()).nonempty('Seleccione al menos un día'),
    checkIn: z.string().min(1, { message: 'Hora de entrada no válida' }),
    checkOut: z.string().min(1, { message: 'Hora de salida no válida' }),
  })
  .refine(
    (data) => {
      const checkInHour = parseInt(data.checkIn.split(':')[0]);
      const checkOutHour = parseInt(data.checkOut.split(':')[0]);
      return checkOutHour > checkInHour;
    },
    {
      message: 'La hora de salida debe ser mayor que la hora de entrada',
      path: ['checkOut'],
    }
  );
