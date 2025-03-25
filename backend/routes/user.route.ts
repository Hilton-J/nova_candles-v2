import { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  deleteUserHandler,
  updateUserHandler,
  addShippingAddressHandler,
} from "../controllers/user.controller";
import {
  validateShippingAddress,
  validateUpdateUser,
} from "../middlewares/validators/userValidator";

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
