import { Types } from "mongoose";
import {
  productDocument,
  reviewDocument,
} from "../interfaces/product.interface";
import HttpError from "../utils/httpError";
import Product from "../models/product.model";
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constants/http.codes";
import Order from "../models/order.model";

export const createProduct = async (productData: productDocument) => {
  const { productName, size } = productData;

  const exists = await Product.findOne({ productName, size });

  if (exists) {
    throw new HttpError("Product already exists", CONFLICT);
  }

  const document = await Product.create(productData);

  if (!document) {
    throw new HttpError("Invalid product data", BAD_REQUEST);
  }

  return document;
};

export const addReview = async (
  id: Types.ObjectId,
  reviewData: reviewDocument
) => {
  const reviewed = await Product.findOne({
    _id: id,
    "reviews.userId": reviewData.userId,
  });

  if (reviewed) {
    throw new HttpError("Product already reviewed", CONFLICT);
  }

  const document = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        reviews: {
          userId: reviewData.userId,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
      },
    },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError("Product not found", NOT_FOUND);
  }

  return document;
};

export const getProductByNameAndSize = async (name: string, size: string) => {
  const document = await Product.findOne({ productName: name, size });

  if (!document) {
    throw new HttpError("Product not found", NOT_FOUND);
  }

  return document;
};

export const addImage = async (id: Types.ObjectId, images: string) => {
  const document = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        images,
      },
    },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError("Product not found", NOT_FOUND);
  }

  return document;
};
