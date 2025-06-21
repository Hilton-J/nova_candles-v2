import { Router } from "express";
import {
  deleteOrderHandler,
  createOrderHandler,
  getAllOrdersHandler,
  getCustomerOrdersHandler,
} from "../controllers/order.controller";
import validateOrder from "../middlewares/validators/orderValidation";
import { protect, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(protect, authorizeRoles("admin"), getAllOrdersHandler)
  .post(protect, authorizeRoles("customer"), validateOrder, createOrderHandler);
router.get("/customer", protect, getCustomerOrdersHandler);
router.delete("/:id", protect, authorizeRoles("admin"), deleteOrderHandler);

export default router;
