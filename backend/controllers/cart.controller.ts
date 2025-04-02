import { Response } from "express";
import asyncHandler from "express-async-handler";
import { CREATED, OK } from "../constants/http.codes";
import { authRequest, userDocument } from "../interfaces/user.interface";
import { getUserCart, removeCart, removeItem } from "../services/cart.service";
import { Types } from "mongoose";

export const getUserCartHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await getUserCart(_id);

    res.status(OK).json(document);
  }
);

export const removeCartHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await removeCart(_id);

    res.status(OK).json(document);
  }
);

export const removeItemHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await removeItem(new Types.ObjectId(req.params.id), _id);

    
  }
);
