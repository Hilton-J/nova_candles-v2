import { Document, Types } from "mongoose";

interface paymentDocument extends Document {
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

export default paymentDocument;
