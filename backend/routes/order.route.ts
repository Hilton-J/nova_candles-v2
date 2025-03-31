import { Router } from "express";
import {
  getAllOrdersHandler,
  deleteOrderHandler,
  createOrderHandler,
  getCustomerOrdersHandler,
} from "../controllers/order.controller";
import validateOrder from "../middlewares/validators/orderValidator";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(protect, authorizeRoles("admin"), getAllOrdersHandler)
  .post(protect, authorizeRoles("customer"), validateOrder, createOrderHandler);
router.get("/customer", protect, getCustomerOrdersHandler);
router.delete("/:id", protect, authorizeRoles("admin"), deleteOrderHandler);

export default router;
