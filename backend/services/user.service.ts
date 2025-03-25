import User from "../models/user.model";
import HttpError from "../utils/httpError";
import { NOT_FOUND } from "../constants/http.codes";
import { addressDocument, userDocument } from "../interfaces/user.interface";
import mongoose from "mongoose";

export const updateUser = async (
  user: mongoose.Types.ObjectId,
  userData: userDocument
) => {
  const document = await User.findByIdAndUpdate(user, userData, {
    new: true,
    runValidators: true,
    timestamps: true,
  }).select("-jwt_secret -password");

  if (!document) {
    throw new HttpError(`No user found with that ID`, NOT_FOUND);
  }

  return document;
};

export const addShippingAddress = async (
  user: userDocument,
  addressData: addressDocument
) => {
  const document = await User.findByIdAndUpdate(
    user._id,
    { $push: { shipToAddress: addressData } },
    { new: true, runValidators: true, timestamps: true }
  ).select("-jwt_secret -password");

  if (!document) {
    throw new HttpError("Please login!", NOT_FOUND);
  }

  return document;
};
