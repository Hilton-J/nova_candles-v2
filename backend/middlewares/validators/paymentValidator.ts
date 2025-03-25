import validator from "./validatorFunction";
import paymentSchema from "../../schemas/paymentSchema";

const validatePayment = validator(paymentSchema);

export default validatePayment;
