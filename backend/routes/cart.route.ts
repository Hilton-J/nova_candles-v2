import { Router } from "express";
import {
  addCartHandler,
  getUserCartHandler,
  removeCartHandler,
  removeItemHandler,
  updateItemQuantityHandler,
} from "../controllers/cart.controller";
import validateCart from "../middlewares/validators/cartValidator";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/add",
  protect,
  authorizeRoles("customer"),
  validateCart,
  addCartHandler
);

router.patch(
  "/update",
  protect,
  authorizeRoles("customer"),
  validateCart,
  updateItemQuantityHandler
);

router
  .route("/")
  .get(protect, authorizeRoles("customer"), getUserCartHandler)
  .delete(protect, authorizeRoles("customer"), removeCartHandler);

router.delete("/:id", protect, authorizeRoles("customer"), removeItemHandler); //BUG: It removes all the items

export default router;
