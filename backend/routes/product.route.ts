import { Router } from "express";
import {
  addReviewHandler,
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByNameAndSizeHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import {
  validateCreateProduct,
  validateReviewProduct,
  validateUpdateProduct,
} from "../middlewares/validators/productValidator";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllProductsHandler);

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

router.get("/:name", getProductByNameAndSizeHandler);

router
  .route("/:id")
  .put(
    protect,
    authorizeRoles("admin"),
    validateUpdateProduct,
    updateProductHandler
  )
  .delete(protect, authorizeRoles("admin"), deleteProductHandler);

export default router;
