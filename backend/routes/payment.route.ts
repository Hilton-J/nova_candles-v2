import { Router } from "express";
import {
  createPaymentHandler,
  getAllPaymentsHandler,
} from "../controllers/payment.controller";
import { authorizeRoles, protect } from "../middlewares/auth.middleware";
import validatePayment from "../middlewares/validators/paymentValidation";

const router = Router();

router
  .route("/")
  .get(protect, authorizeRoles("admin"), getAllPaymentsHandler)
  .post(
    protect,
    authorizeRoles("customer"),
    validatePayment,
    createPaymentHandler
  );

export default router;
