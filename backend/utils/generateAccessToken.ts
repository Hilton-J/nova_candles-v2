import jwt, { SignOptions } from "jsonwebtoken";
import { userDocument } from "../interfaces/user.interface";

/**
 * Generates a short-lived access token.
 * @param {Object} user - The user object containing user details.
 */
const generateAccessToken = (user: userDocument) => {
  const jwtOptions: SignOptions = {
    expiresIn: "24h", // the cookie will expire after 24 Hours
    issuer: "novacandlesv2.com",
    audience: "API V2",
  };

  if (!user.jwt_secret) {
    throw new Error("JWT secret is missing for the user.");
  }

  return jwt.sign(
    {
      id: user._id,
    },
    user.jwt_secret,
    jwtOptions
  );
};

export default generateAccessToken;
