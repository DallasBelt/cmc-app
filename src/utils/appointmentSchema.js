import { z } from 'zod';

export const newAppointmentSchema = z
  .object({
    date: z
      .date()
      .nullable()
      .refine((val) => val !== null, {
        message: 'Fecha de cita requerida',
      }),
    startTime: z.string().min(1, { message: 'Hora inicial no válida' }),
    endTime: z.string().min(1, { message: 'Hora final no válida' }),
    patient: z.string().uuid({ message: 'Paciente no válido' }),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(':').map(Number);
      const [endHour, endMinute] = data.endTime.split(':').map(Number);

      // First compare the hours. If they're the same, compare the minutes
      if (endHour > startHour) {
        return true;
      } else if (endHour === startHour) {
        return endMinute > startMinute;
      }
      return false;
    },
    {
      message: 'La hora final debe ser mayor que la hora inicial',
      path: ['endTime'],
    }
  );
