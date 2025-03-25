import { Router } from "express";
import {
  addReviewHandler,
  createProductHandler,
} from "../controllers/product.controller";
import {
  validateCreateProduct,
  validateReviewProduct,
} from "../middlewares/validators/productValidator";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/add",
  protect,
  authorizeRoles("admin"),
  validateCreateProduct,
  createProductHandler
);
router.patch(
  "/review/:id",
  protect,
  authorizeRoles("customer"),
  validateReviewProduct,
  addReviewHandler
);

export default router;
