import { Types } from "mongoose";
import Order from "../models/order.model";
import { NOT_FOUND, CREATED, BAD_REQUEST } from "../constants/http.codes";
import { orderDocument } from "../interfaces/order.interface";
import HttpError from "../utils/httpError";

export const createOrder = async (orderData: orderDocument) => {
  const document = await Order.create(orderData);

  if (!document) {
    throw new HttpError("Invalid order data", BAD_REQUEST);
  }

  return document;
};

export const getCustomerOrders = async (userId: Types.ObjectId) => {
  const document = await Order.find({ userId });

  if (!document) {
    throw new HttpError("No orders for this user", NOT_FOUND);
  }

  return document;
};
