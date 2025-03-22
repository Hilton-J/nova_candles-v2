import { UNAUTHORIZED, CONFLICT } from "../constants/http.codes";
import HttpError from "../utils/httpError";
import User, { userDocument } from "../models/user.model";
import crypto from "crypto";

interface registerUser extends userDocument {
  confirmPassword: string;
}

export const loginUser = async (credentials: userDocument) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    throw new HttpError("Invalid email or password", UNAUTHORIZED);

  return user;
};

export const registerUser = async (userData: registerUser) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    password,
    confirmPassword,
  } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) throw new HttpError("Email already exists", CONFLICT);

  if (confirmPassword !== password)
    throw new HttpError("Passwords don't match", UNAUTHORIZED);

  const jwt_secrete = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    password,
    jwt_secrete,
  });

  return user;
};
