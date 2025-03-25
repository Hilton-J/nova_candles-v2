import validator from "./validatorFunction";
import { loginSchema, registerSchema } from "../../schemas/authSchema";

export const validateLogin = validator(loginSchema);
export const validateRegister = validator(registerSchema);
