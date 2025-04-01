import { Document, Types } from "mongoose";
import { IItem } from "../models/items.schema";

export interface ICart {
  userId: Types.ObjectId;
  items: IItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface cartDocument extends ICart, Document {
  _id: Types.ObjectId;
}
