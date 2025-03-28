import logger from "./logger";
import env from "../schemas/envSchema";
import { CookieOptions, Response } from "express";
import generateAccessToken from "./generateAccessToken";
import generateRefreshToken from "./generateRefreshToken";
import { userDocument } from "../interfaces/user.interface";
import { after30Days, after90Days } from "../constants/date.const";

const generateToken = async (res: Response, user: userDocument) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    if (res.headersSent) {
      logger.error("Headers already sent; cannot set cookies.");
    }

    res.cookie(
      "jwt_token_v2",
      accessToken,
      accessCookieOptions as CookieOptions
    );

    res.cookie(
      "refreshToken_v2",
      refreshToken,
      refreshCookieOptions as CookieOptions
    );

    console.log("AuthMiddleware line 36", res.cookie);

    return;
  } catch (error) {
    logger.error(`Error generating tokens ${error}`);
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
  path: "/apiv2",
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
  path: "/apiv2/refresh", // Adjust as needed, separate endpoint for refresh
});

export default generateToken;
