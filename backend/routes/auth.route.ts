import { Router } from "express";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validators/authValidator";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/auth.controller";

const router = Router();

router.post("/", validateLogin, loginHandler);
router.post("/register", validateRegister, registerHandler);
router.post("/logout", logoutHandler);

export default router;
