import { Schema, Types } from "mongoose";

export interface IItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

const itemsSchema = new Schema<IItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },
});

export default itemsSchema;
