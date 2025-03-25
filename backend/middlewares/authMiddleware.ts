import {
  NOT_FOUND,
  FORBIDDEN,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from "../constants/http.codes";
import User from "../models/user.model";
import HttpError from "../utils/httpError";
import jwt, { JwtPayload } from "jsonwebtoken";
import asynchandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { authRequest } from "../interfaces/user.interface";

export const protect = asynchandler(
  async (req: authRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.jwt_token;
    if (!accessToken)
      return next(
        new HttpError("Not Authorized, invalid accessToken", UNAUTHORIZED)
      );

    const decoded = jwt.decode(accessToken) as JwtPayload;
    if (!decoded || !decoded.id) {
      return next(
        new HttpError("Not authorized, invalid token structure", UNAUTHORIZED)
      );
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return next(new HttpError("Not authorized, user not found", NOT_FOUND));

    const currentJwtSecret = user.jwt_secret;

    if (!currentJwtSecret) {
      return next(
        new HttpError(
          "Server error: User jwt_secret missing",
          INTERNAL_SERVER_ERROR
        )
      );
    }

    try {
      jwt.verify(accessToken, currentJwtSecret);
      req.user = user.omitField("jwt_secret");
      next();
    } catch (error) {
      next(new HttpError("Not Authorized, invalid token", UNAUTHORIZED));
    }
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: authRequest, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      next(new HttpError("Not authorized", FORBIDDEN));
    }
  };
};
