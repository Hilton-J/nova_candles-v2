import { z } from "zod";

const base64ImageRegex =
  /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;

export const reviewProductSchema = z.object({
  comment: z.string().optional(),
  rating: z.coerce.number().gte(1).lte(5),
});

export const productSchema = z.object({
  productName: z.string().min(1),
  description: z.string().min(1),
  price: z.object({
    small: z.coerce.number().optional(),
    medium: z.coerce.number().optional(),
    large: z.coerce.number().optional(),
  }),
  fragrance: z.string(),
  stock: z.coerce.number(),
  type: z.string(),
  images: z.string().regex(base64ImageRegex, "Invalid base64 image").optional(),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.object({
    small: z.coerce.number().optional(),
    medium: z.coerce.number().optional(),
    large: z.coerce.number().optional(),
  }),
  fragrance: z.string().optional(),
  stock: z.coerce.number().optional(),
  type: z.string().optional(),
  isActive: z.string().optional(), //z.coerce.boolean() will not work because it does not behave the way is expected
});

export const imageScheme = z
  .object({
    images: z.string().regex(base64ImageRegex, "Invalid base64 image"),
  })
  .strict();
