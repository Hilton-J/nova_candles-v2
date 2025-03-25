import {
  imageScheme,
  productSchema,
  reviewProductSchema,
  updateProductSchema,
} from "../../schemas/productSchema";
import validator from "./validatorFunction";

export const validateImage = validator(imageScheme);
export const validateCreateProduct = validator(productSchema);
export const validateUpdateProduct = validator(updateProductSchema);
export const validateReviewProduct = validator(reviewProductSchema);
