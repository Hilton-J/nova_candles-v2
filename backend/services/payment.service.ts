import HttpError from "../utils/httpError";
import Payment from "../models/payment.model";
import paymentDocument from "../interfaces/payment.interface";
import { CONFLICT, BAD_REQUEST } from "../constants/http.codes";
import { Types } from "mongoose";

export const createPayment = async (
  userId: Types.ObjectId,
  paymentData: paymentDocument
) => {
  const exists = await Payment.findOne({
    userId,
    orderId: paymentData.orderId,
  });

  if (exists) {
    throw new HttpError("Payment already processed", CONFLICT);
  }

  const document = await Payment.create(paymentData);

  if (!document) {
    throw new HttpError("Invalid payment data", BAD_REQUEST);
  }

  return document;
};
