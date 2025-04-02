import { Types } from "mongoose";
import Order from "../models/order.model";
import HttpError from "../utils/httpError";
import { orderDocument } from "../interfaces/order.interface";
import { NOT_FOUND, BAD_REQUEST } from "../constants/http.codes";

export const createOrder = async (orderData: orderDocument) => {
  const document = await Order.create(orderData);

  if (!document) {
    throw new HttpError("Invalid order data", BAD_REQUEST);
  }

  return document;
};

export const getCustomerOrders = async (userId: Types.ObjectId) => {
  const document = await Order.find({ userId })
    .populate({ path: "items.productId", select: "productName size" })
    .populate({ path: "userId", select: "firstName LastName email" });

  if (!document) {
    throw new HttpError("No orders for this user", NOT_FOUND);
  }

  return document;
};
