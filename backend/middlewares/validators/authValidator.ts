import { loginSchema, registerSchema } from "../../schemas/authSchema";
import validator from "./validatorFunction";

export const validateLogin = validator(loginSchema);
export const validateRegister = validator(registerSchema);
