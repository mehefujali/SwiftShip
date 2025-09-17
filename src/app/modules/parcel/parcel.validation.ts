import { z } from "zod";

export const createParcelValidationSchema = z.object({
  body: z.object({
    receiverName: z.string(),
    receiverPhone: z.string(),
    receiverAddress: z.string(),
    weight: z.number().positive(),
    type: z.string(),
    fee: z.number().positive(),
  }),
});
