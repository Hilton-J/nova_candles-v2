import {
  deleteOneDoc,
  getAllDocs,
  getOneDoc,
} from "../services/crudHandlerFactory";
import User from "../models/user.model";
import { OK } from "../constants/http.codes";
import asyncHandler from "express-async-handler";
import { Response } from "express";
import { authRequest } from "../middlewares/authMiddleware";
import { updateUser } from "../services/user.service";

export const getUserByIdHandler = getOneDoc(User);
export const getAllUsersHandler = getAllDocs(User);
export const deleteUserHandler = deleteOneDoc(User);

export const updateUserHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const doc = await updateUser(req.user!, req.body);
    const document = doc.omitField(["jwt_secret", "password"]);

    res.status(OK).json({
      success: true,
      message: `User updated successfully`,
      results: document,
    });
  }
);
