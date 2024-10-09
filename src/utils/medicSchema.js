import { z } from 'zod';

export const medicInfoSchema = z
  .object({
    registry: z.string().min(1, { message: 'Registro requerido' }),
    speciality: z
      .array(z.string())
      .nonempty('Seleccione al menos una especialidad'),
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
