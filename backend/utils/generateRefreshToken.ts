import crypto from "crypto";

/**
 * Generates a long-lived refresh token.
 * @param {Object} user - The user object containing user details.
 */
const generateRefreshToken = () => {
  const random = crypto.randomBytes(64);
  const refreshToken = random.toString("hex");

  return refreshToken;
};

export default generateRefreshToken;
