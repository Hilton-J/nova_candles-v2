import { Types } from "mongoose";
import Cart from "../models/cart.model";
import HttpError from "../utils/httpError";
import Product from "../models/product.model";
import { IItem } from "../models/items.schema";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/http.codes";

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

  document.totalPrice = document.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  await document.save();

  return document;
};

export const updateItemQuantity = async (
  itemData: IItem,
  userId: Types.ObjectId
) => {
  const document = await Cart.findOneAndUpdate(
    { userId, "items.productId": itemData.productId },
    { $set: { "items.$.quantity": itemData.quantity } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  document.totalPrice = document.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  await document.save();

  return document;
};

export const addCart = async (itemData: IItem, userId: Types.ObjectId) => {
  let statusCode;
  const product = await Product.findById(itemData.productId);

  if (!product) {
    throw new HttpError("No product found with that ID", NOT_FOUND);
  }

  let document = await Cart.findOne({ userId });

  if (document) {
    const itemExists = document.items.find(
      (item) => item.productId.toString() === itemData.productId.toString()
    );

    if (itemExists) {
      itemExists.quantity += itemData.quantity;
    } else {
      document.items.push(itemData);
    }

    document.totalPrice = document.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    await document.save();

    statusCode = OK;
  } else {
    document = await Cart.create({
      userId,
      items: [itemData],
      totalPrice: itemData.price * itemData.quantity,
    });

    if (!document) throw new HttpError("Error creating cart", BAD_REQUEST);
    statusCode = CREATED;
  }

  return { document, statusCode };
};
