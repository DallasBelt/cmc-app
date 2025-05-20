import { z } from 'zod';
import { specialties } from '@/constants';

const validSpecialties = specialties.map((s) => s.id);

export const medicInfoSchema = z.object({
  registry: z.string().min(1, { message: 'Registro médico requerido' }),
  speciality: z.enum(validSpecialties, {
    errorMap: () => ({ message: 'Especialidad inválida' }),
  }),
});
