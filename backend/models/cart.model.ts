import itemsSchema from "./items.schema";
import { Model, model, Schema } from "mongoose";
import { cartDocument } from "../interfaces/cart.interface";

const cartSchema = new Schema<cartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [itemsSchema],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1, "items.productId": 1 });

const Cart: Model<cartDocument> = model<cartDocument>("Cart", cartSchema);

export default Cart;
