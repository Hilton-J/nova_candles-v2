import crypto from "crypto";

/**
 * Generates a long-lived refresh token.
 */
const generateRefreshToken = () => {
  const random = crypto.randomBytes(64);
  const refreshToken = random.toString("hex");

  return refreshToken;
};

export default generateRefreshToken;
