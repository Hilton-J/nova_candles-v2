import { Schema, Types } from "mongoose";

type ProductSize = "small" | "medium" | "large";

export interface IItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  fragrance: string;
  productName: string;
  size: ProductSize;
  image: string;
}

const itemsSchema = new Schema<IItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },
  fragrance: { type: String, required: true },
  productName: { type: String, required: true },
  size: { type: String, required: true, enum: ["small", "medium", "large"] },
  image: { type: String, required: true },
});

export default itemsSchema;
