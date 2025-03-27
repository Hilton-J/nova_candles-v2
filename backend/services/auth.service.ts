import crypto from "crypto";
import User from "../models/user.model";
import HttpError from "../utils/httpError";
import { registerUser, userDocument } from "../interfaces/user.interface";
import { UNAUTHORIZED, CONFLICT, BAD_REQUEST } from "../constants/http.codes";

export const loginUserHandler = async (credentials: userDocument) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    throw new HttpError("Invalid email or password", UNAUTHORIZED);

  return user;
};

export const registerUserHandler = async (userData: registerUser) => {
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

  const jwt_secret = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    password,
    jwt_secret,
  });

  if (!user) {
    throw new HttpError("Invalid user data", BAD_REQUEST);
  }

  return user;
};
