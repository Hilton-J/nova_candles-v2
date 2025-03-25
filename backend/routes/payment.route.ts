import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";
import validatePayment from "../middlewares/validators/paymentValidator";

const router = Router();

router.post("/", protect, authorizeRoles("customer"), validatePayment);
router.get("/", protect, authorizeRoles("admin"));

export default router;
