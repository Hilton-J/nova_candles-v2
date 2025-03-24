import { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  deleteUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";

const router = Router();

router.post("/profile", protect, updateUserHandler);
router.get("/", protect, authorizeRoles("admin"), getAllUsersHandler);
router
  .route("/:id")
  .delete(protect, deleteUserHandler)
  .get(protect, authorizeRoles("admin"), getUserByIdHandler);

export default router;
