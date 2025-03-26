import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";
import validatePayment from "../middlewares/validators/paymentValidator";
import { createPaymentHandler, getAllPaymentsHandler } from "../controllers/payment.controller";

const router = Router();

router
  .route("/")
  .get(protect, authorizeRoles("admin"), getAllPaymentsHandler)
  .post(protect, authorizeRoles("customer"), validatePayment,createPaymentHandler);

export default router;
