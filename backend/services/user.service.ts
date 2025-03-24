import User from "../models/user.model";
import HttpError from "../utils/httpError";
import { NOT_FOUND } from "../constants/http.codes";
import { userDocument } from "../interfaces/user.interface";

export const updateUser = async (
  user: userDocument,
  userData: userDocument
) => {
  const document = await User.findByIdAndUpdate(user._id, userData, {
    new: true,
    runValidators: true,
    timestamps: true,
  });

  if (!document) {
    throw new HttpError(`No user found with that ID`, NOT_FOUND);
  }

  return document;
};
