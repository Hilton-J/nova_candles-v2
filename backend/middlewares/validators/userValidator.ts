import {
  addressSchema,
  updateUserSchema,
} from "../../schemas/updateUserSchema";
import validator from "./validatorFunction";

export const validateUpdateUser = validator(updateUserSchema);
export const validateShippingAddress = validator(addressSchema);
