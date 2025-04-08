import { z } from 'zod';

export const medicalRecordSchema = z.object({
  bloodPressure: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val) return true;
        const [systolic, diastolic] = val.split('/');
        return (
          systolic &&
          diastolic &&
          !isNaN(Number(systolic)) &&
          !isNaN(Number(diastolic))
        );
      },
      {
        message: 'El formato debe ser sistólica/diastólica (ej: 120/80)',
      }
    ),
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
