import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validators/authValidation";

const router = Router();

router.post("/", validateLogin, loginHandler);
router.post("/register", validateRegister, registerHandler);
router.post("/logout", logoutHandler);

export default router;
