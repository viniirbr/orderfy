import z from "zod";

export const CreateOrderSchema = z.object({
  customerName: z.string(),
  customerEmail: z.string().email(),
  company: z.string(),
  address: z.string().optional(),
  time: z.string(),
  orderText: z.string(),
});
