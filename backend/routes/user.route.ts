import { Router } from "express";
import {
  deleteUserHandler,
  updateUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  addShippingAddressHandler,
} from "../controllers/user.controller";
import {
  validateUpdateUser,
  validateShippingAddress,
} from "../middlewares/validators/userValidation";
import { protect, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.put("/profile", protect, validateUpdateUser, updateUserHandler);
router.get("/", protect, authorizeRoles("admin"), getAllUsersHandler);
router.put(
  "/address/add",
  protect,
  authorizeRoles("customer"),
  validateShippingAddress,
  addShippingAddressHandler
);
router
  .route("/:id")
  .delete(protect, authorizeRoles("admin"), deleteUserHandler)
  .get(protect, authorizeRoles("admin"), getUserByIdHandler);

export default router;
