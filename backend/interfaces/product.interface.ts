import { Document, Types } from "mongoose";

export interface IProduct {
  productName: string;
  description: string;
  price: number;
  size: string;
  stock: number;
  type: string;
  images?: string[];
  reviews: reviewDocument[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface productDocument extends IProduct, Document {
  _id: Types.ObjectId;
}

export interface IReview {
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}
export interface reviewDocument extends IReview, Document {
  _id: Types.ObjectId;
}
