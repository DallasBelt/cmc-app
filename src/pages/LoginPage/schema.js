import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string().min(1, 'Correo electrónico requerido')
    .email({ message: 'Utilice un correo electrónico válido' }),
  password: z.string().min(1, 'Contraseña requerida'),
});

export default loginSchema;