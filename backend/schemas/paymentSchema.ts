import mongoose from "mongoose";
import { z } from "zod";

const paymentSchema = z.object({
  orderId: z
    .string()
    .trim()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid Id"),
  paymentMethod: z.string().trim(),
  cardBrand: z.string().trim(),
  status: z.string().trim(),
  amount: z.coerce.number(),
  last4Digits: z.string().trim().min(4, "4 digits required"),
});

export default paymentSchema;
