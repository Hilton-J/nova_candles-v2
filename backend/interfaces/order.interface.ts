import { Document, Types } from "mongoose";
import { IItem } from "../models/items.schema";

export interface IOrder {
  orderNumber: string;
  orderDate: Date;
  items: IItem[];
  totalPrice: number;
  userId: Types.ObjectId;
  deliveryAddress: Types.ObjectId;
  billingAddress: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface orderDocument extends IOrder, Document {
  _id: Types.ObjectId;
}
