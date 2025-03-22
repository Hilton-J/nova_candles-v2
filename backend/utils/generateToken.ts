import env from "../schemas/envSchema";
import generateAccessToken from "./generateAccessToken";
import generateRefreshToken from "./generateRefreshToken";
import { after30Days, after90Days } from "../constants/date.const";
import { CookieOptions, Response } from "express";
import { userDocument } from "../models/user.model";
import logger from "./logger";

const generateToken = async (res: Response, user: userDocument) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    if (!res.headersSent) {
      res.cookie("jwt_token", accessToken, accessCookieOptions());
      res.cookie("refreshToken", refreshToken, refreshCookieOptions());
    } else {
      logger.error("Headers already sent; cannot set cookies.");
    }

    return;
  } catch (error) {
    logger.error("Error generating tokens", error);
    throw new Error(`Failed to generate tokens ${error}`);
  }
};

/**
 * Creates options for the JWT access cookie.
 *
 * @returns {Object} The cookie options.
 */
const accessCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict", //This prevents CSRF (Cross Site ERequest Forgery) attachs
  expires: after30Days(), //Will expire after 30 day
  path: "/api",
});

/**
 * Creates options for the JWT access cookie.
 *
 * @returns {Object} The cookie options.
 */
const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "strict",
  secure: env.NODE_ENV === "production", // Use secure cookies only in production
  expires: after90Days(), // Long-lived refresh token
  path: "/api/refresh", // Adjust as needed, separate endpoint for refresh
});

export default generateToken;
