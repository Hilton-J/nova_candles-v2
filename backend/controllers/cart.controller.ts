import { Types } from "mongoose";
import {
  addCart,
  getUserCart,
  removeCart,
  removeItem,
  updateItemQuantity,
} from "../services/cart.service";
import { Response, Request } from "express";
import { OK } from "../constants/http.codes";
import asyncHandler from "express-async-handler";
import { userDocument } from "../interfaces/user.interface";

export const getUserCartHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await getUserCart(_id);
    res.status(OK).json(document);
  }
);

export const removeCartHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await removeCart(_id);

    res.status(OK).json(document);
  }
);

export const removeItemHandler = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await removeItem(new Types.ObjectId(req.params.id), _id);

    res.status(OK).json({
      success: true,
      message: "Item removed",
      results: document,
    });
  }
);

export const updateItemQuantityHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user as userDocument;

    const document = await updateItemQuantity(req.body, _id);

    res.status(OK).json({
      success: true,
      message: "Quantity updated",
      results: document,
    });
  }
);

export const addCartHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id } = req.user as userDocument;
    const { document, statusCode } = await addCart(req.body, _id);

    res.status(statusCode).json({
      success: true,
      message: "Cart created/updated",
      results: document,
    });
  }
);
