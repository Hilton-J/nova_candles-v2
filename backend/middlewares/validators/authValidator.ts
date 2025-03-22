import { loginSchema } from "../../schemas/authSchema";
import validator from "./validatorFunction";

const validateLogin = validator(loginSchema);

export default validateLogin;
