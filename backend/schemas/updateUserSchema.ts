import { z } from "zod";

export const addressSchema = z.object({
  recipientName: z.string().min(1, "Name required").trim(),
  recipientLastName: z.string().min(1, "Last Name required").trim(),
  recipientPhoneNumber: z
    .string()
    .min(9, "Phone Number must be at least 9 digits as per RSA")
    .trim(),
  streetAddress: z.string().min(1, "Street address required").trim(),
  apartment: z
    .string()
    .min(1, "Apartment must have characters")
    .trim()
    .optional(),
  city: z.string().min(1, "City required").trim(),
  province: z.string().min(1, "Province required").trim(),
  postalCode: z.coerce.number(),
});

export const updateUserSchema = z
  .object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.string().email("Invalid email").trim().optional(),
    password: z
      .string()
      .trim()
      .min(3, "Password must be at least 3 characters")
      .optional(),
    phoneNumber: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();
