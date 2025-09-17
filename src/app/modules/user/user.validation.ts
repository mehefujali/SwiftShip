import { z } from "zod";
import { Role } from "./user.interface";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    address: z.string(),
    role: z.nativeEnum(Role).optional(),
  }),
});
