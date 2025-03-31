import Order from "../models/order.model";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CREATED, OK } from "../constants/http.codes";
import { authRequest, userDocument } from "../interfaces/user.interface";
import { createOrder, getCustomerOrders } from "../services/order.service";
import { deleteOneDoc, getAllDocs } from "../services/crudHandlerFactory";

export const getAllOrdersHandler = getAllDocs(Order);
export const deleteOrderHandler = deleteOneDoc(Order);

export const createOrderHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;
    await createOrder({ ...req.body, userId: _id });

    res.status(CREATED).json({
      success: true,
      message: "Order placed successfully",
    });
  }
);

export const getCustomerOrdersHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;
    const document = await getCustomerOrders(_id);

    res.status(OK).json(document);
  }
);
