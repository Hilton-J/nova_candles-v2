import { Document, Types } from "mongoose";

export interface IPrice {
  small: number,
  medium: number,
  large: number,
}

export interface IProduct {
  productName: string;
  description: string;
  price: IPrice;
  fragrance: string;
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
