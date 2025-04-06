import { z } from 'zod';

export const historySchema = z.object({
  bloodPressure: z.string(),
  oxygenSaturation: z.string(),
  bodyTemperature: z.string(),
  heartRate: z.string(),
  respiratoryRate: z.string(),
  weight: z.string(),
  height: z.string(),
  allergies: z.string(),
  symptoms: z.string().min(1, { message: 'Síntomas requeridos' }),
  diagnostic: z.string().min(1, { message: 'Diagnóstico requerido' }),
  treatment: z.string().min(1, { message: 'Tratamiento requerido' }),
  prescription: z.string(),
  observations: z.string(),
  patientId: z.string().uuid({ message: 'Paciente no válido' }),
});
