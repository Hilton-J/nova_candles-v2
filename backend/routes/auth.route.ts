import { Router } from "express";
import validateLogin from "../middlewares/validators/authValidator";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post("/", validateLogin, login);

export default router;
