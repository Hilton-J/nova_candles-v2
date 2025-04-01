import mongoose from 'mongoose';
import { z } from 'zod';

export const itemSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid id format'),
  quantity: z.coerce.number().default(1),
});