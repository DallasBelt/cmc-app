import { z } from 'zod';

const optionalText = () =>
  z.preprocess((val) => (val === '' || val === undefined ? null : val), z.string().nullable());

export const medicalRecordSchema = z.object({
  symptoms: z.string().min(1, { message: 'Síntomas requeridos' }),
  diagnostic: z.string().min(1, { message: 'Diagnóstico requerido' }),
  treatment: z.string().min(1, { message: 'Tratamiento requerido' }),
  prescription: optionalText(),
  bloodPressure: z
    .object({
      systolic: z.preprocess(
        (val) => {
          if (val === '' || val === undefined) return null;
          return Number(val);
        },
        z.union([z.number().min(50, 'Mín 50').max(250, 'Máx 250'), z.null()])
      ),
      diastolic: z.preprocess(
        (val) => {
          if (val === '' || val === undefined) return null;
          return Number(val);
        },
        z.union([z.number().min(30, 'Mín 30').max(150, 'Máx 150'), z.null()])
      ),
    })
    .refine(
      (bp) => {
        const { systolic, diastolic } = bp;
        if (systolic != null && diastolic != null) {
          return systolic > diastolic;
        }
        return true;
      },
      {
        message: 'La sistólica debe ser mayor que la diastólica',
        path: ['systolic'],
      }
    )
    .optional(),
  oxygenSaturation: optionalText(),
  bodyTemperature: optionalText(),
  heartRate: optionalText(),
  respiratoryRate: optionalText(),
  weight: optionalText(),
  height: optionalText(),
  observations: optionalText(),
  patientId: z.string().uuid({ message: 'Paciente no válido' }),
});
