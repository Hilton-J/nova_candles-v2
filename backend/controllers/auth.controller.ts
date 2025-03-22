import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import User from "../models/user.model";
import { loginUser, registerUser } from "../services/auth.service";
import { clearAuthCookies } from "../utils/authCookie";
import { CREATED, OK } from "../constants/http.codes";
import { NextFunction, Request, Response } from "express";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await loginUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(["jwt_secrete", "password"]);
  res.status(OK).json(data);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  clearAuthCookies(res);
  res.status(OK).json({ success: true, message: "User logged out" });
});

export const registerHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await registerUser(req.body);
    await generateToken(res, user);
    const data = new User(user).omitField(["jwt_secrete", "password"]);
    res.status(CREATED).json({ status: "User successfullyregitered", data });
  }
);
