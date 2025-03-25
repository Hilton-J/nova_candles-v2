import { Document, ObjectId } from "mongoose";

export interface productDocument extends Document {
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

export interface reviewDocument extends Document {
  userId: ObjectId;
  rating: number;
  comment: string;
  date: Date;
}
