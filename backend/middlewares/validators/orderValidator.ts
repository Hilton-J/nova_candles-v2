import validator from "./validatorFunction";
import orderSchema from "../../schemas/orderSchema";

const validateOrder = validator(orderSchema);
export default validateOrder;
