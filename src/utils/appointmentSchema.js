import { z } from 'zod';

export const newAppointmentSchema = z
  .object({
    date: z
      .date()
      .nullable()
      .refine((val) => val !== null, {
        message: 'Fecha de cita requerida',
      }),
    startTime: z.string().min(1, { message: 'Hora incial no válida' }),
    endTime: z.string().min(1, { message: 'Hora final no válida' }),
    patient: z.string().uuid({ message: 'Paciente no válido' }),
    // reason: z.string().min(1, { message: 'Motivo de la cita requerido' }),
  })
  .refine(
    (data) => {
      const startTimeHour = parseInt(data.startTime.split(':')[0]);
      const endTimeHour = parseInt(data.endTime.split(':')[0]);
      return endTimeHour > startTimeHour;
    },
    {
      message: 'La hora final debe ser mayor que la hora inicial',
      path: ['endTime'],
    }
  );
