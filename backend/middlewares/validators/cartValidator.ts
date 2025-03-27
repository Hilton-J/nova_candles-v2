import validator from "./validatorFunction";
import itemSchema from "../../schemas/itemSchema";

const validateCart = validator(itemSchema);
export default validateCart;
