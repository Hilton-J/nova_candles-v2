import { Document, Types } from "mongoose";

export interface IPayment {
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  paymentMethod: string;
  cardBrand: string;
  last4Digits: string;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface paymentDocument extends IPayment, Document {
  _id: Types.ObjectId;
}
