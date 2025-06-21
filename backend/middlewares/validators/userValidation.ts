import validator from "./validatorFunction";
import addressSchema from "../../schemas/addressSchema";
import updateUserSchema from "../../schemas/updateUserSchema";

export const validateUpdateUser = validator(updateUserSchema);
export const validateShippingAddress = validator(addressSchema);
