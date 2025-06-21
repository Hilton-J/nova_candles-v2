import { Router } from "express";
import {
  addImageHandler,
  addReviewHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
} from "../controllers/product.controller";
import {
  validateImage,
  validateCreateProduct,
  validateReviewProduct,
  validateUpdateProduct,
} from "../middlewares/validators/productValidation";
import { authorizeRoles, protect } from "../middlewares/auth.middleware";

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

// router.get("/:name", getProductByNameAndSizeHandler);

router
  .route("/:id")
  .put(
    protect,
    authorizeRoles("admin"),
    validateUpdateProduct,
    updateProductHandler
  )
  .get(getProductByIdHandler)
  .delete(protect, authorizeRoles("admin"), deleteProductHandler)
  .patch(protect, authorizeRoles("admin"), validateImage, addImageHandler);

export default router;
