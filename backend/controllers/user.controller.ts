import { Response } from "express";
import {
  deleteOneDoc,
  getAllDocs,
  getOneDoc,
} from "../services/crudHandlerFactory";
import User from "../models/user.model";
import { OK } from "../constants/http.codes";
import asyncHandler from "express-async-handler";
import { addShippingAddress, updateUser } from "../services/user.service";
import { authRequest, userDocument } from "../interfaces/user.interface";
import mongoose, { ObjectId } from "mongoose";

export const getUserByIdHandler = getOneDoc(User); //This doesn't make sense. Who would be getting the user by Id
export const getAllUsersHandler = getAllDocs(User);
export const deleteUserHandler = deleteOneDoc(User);

export const addShippingAddressHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const document = await addShippingAddress(req.user!, req.body);

    res.status(OK).json({
      success: true,
      message: `Address added successfully`,
      results: document,
    });
  }
);

export const updateUserHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user!;

    const document = await updateUser(
      new mongoose.Types.ObjectId(_id),
      req.body
    );

    res.status(OK).json({
      success: true,
      message: `User updated successfully`,
      results: document,
    });
  }
);
