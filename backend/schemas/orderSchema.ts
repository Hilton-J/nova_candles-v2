import { z } from "zod";
import itemSchema from "./itemSchema";
import addressSchema from "./addressSchema";

const orderSchema = z
  .object({
    deliveryAddress: addressSchema,
    billingAddress: addressSchema,
    totalPrice: z.coerce.number(),
    items: z.array(itemSchema),
    orderDate: z.date().default(() => new Date()),
  })
  .strict();

export default orderSchema;
