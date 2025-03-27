import { z } from "zod";
import { Types } from "mongoose";

const itemSchema = z.object({
  productId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), "Invalid id format"),
  quantity: z.coerce.number().default(1),
});

export default itemSchema;