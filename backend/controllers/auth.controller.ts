import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import User from "../models/user.model";
import {
  loginUserHandler,
  registerUserHandler,
} from "../services/auth.service";
import { clearAuthCookies } from "../utils/authCookie";
import { CREATED, OK } from "../constants/http.codes";
import { Request, Response } from "express";
import { registerUser, userDocument } from "../interfaces/user.interface";

export const loginHandler = asyncHandler(
  async (req: Request<{}, {}, userDocument>, res: Response) => {
    const user = await loginUserHandler(req.body);
    await generateToken(res, user);
    const data = new User(user).omitField(["jwt_secret", "password"]);
    res.status(OK).json(data);
  }
);

export const logoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    clearAuthCookies(res);
    res.status(OK).json({ success: true, message: "User logged out" });
  }
);

export const registerHandler = asyncHandler(
  async (req: Request<{}, {}, registerUser>, res: Response) => {
    const user = await registerUserHandler(req.body);
    await generateToken(res, user);
    const data = new User(user).omitField(["jwt_secret", "password"]);
    res.status(CREATED).json({ status: "User successfully regitered", data });
  }
);
