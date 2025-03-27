import { Types } from "mongoose";
import { Response } from "express";
import Payment from "../models/payment.model";
import asyncHandler from "express-async-handler";
import { CREATED } from "../constants/http.codes";
import { createPayment } from "../services/payment.service";
import { getAllDocs } from "../services/crudHandlerFactory";
import { authRequest, userDocument } from "../interfaces/user.interface";

export const getAllPaymentsHandler = getAllDocs(Payment);

export const createPaymentHandler = asyncHandler(
  async (req: authRequest, res: Response) => {
    const { _id } = req.user as userDocument;

    await createPayment(_id, {
      userId: _id,
      ...req.body,
    });

    res.status(CREATED).json({
      success: true,
      message: "Payment processed",
    });
  }
);
