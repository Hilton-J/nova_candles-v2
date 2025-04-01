import { Types } from "mongoose";
import Cart from "../models/cart.model";
import HttpError from "../utils/httpError";
import { NOT_FOUND } from "../constants/http.codes";
import Product from "../models/product.model";

export const getUserCart = async (userId: Types.ObjectId) => {
  const document = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "productName images",
  });

  if (!document) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  return document;
};

export const removeCart = async (userId: Types.ObjectId) => {
  const document = await Cart.findOneAndDelete({ userId });

  if (!document) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  return document;
};

export const removeItem = async (
  productId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const document = await Cart.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $pull: { items: { productId } } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  return document;
};

export const addCart = async (
  productId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new HttpError("No product found with that ID", NOT_FOUND);
  }

  const document = await Cart.findOne({ userId });

  if (!document) {
    const createCart = await Cart.create({})
  }
};
