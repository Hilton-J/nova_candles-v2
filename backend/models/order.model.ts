import itemsSchema from "./items.schema";
import { Model, model, Schema } from "mongoose";
import { orderDocument } from "../interfaces/order.interface";
import { addressSchema } from "./user.model";

export interface orderedItems {
  productName: { type: string; required: true };
  quantity: { type: number; required: true };
  price: { type: number; required: true };
}

const orderSchema = new Schema<orderDocument>(
  {
    orderNumber: { type: String, unique: true },
    orderDate: { type: Date, default: Date.now },
    items: [itemsSchema],
    totalPrice: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryAddress: addressSchema,
    billingAddress: addressSchema,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    //Checks if orderNumber already set
    const currentYear = new Date().getFullYear(); //Get the current year
    const lastOrder = await model("Order")
      .findOne({ orderNumber: new RegExp(`^${currentYear}_`) })
      .sort({ orderNumber: -1 }) // Sort in descending order
      .exec();

    let increment = 1;
    if (lastOrder) {
      const lastOrderNumber = lastOrder.orderNumber;
      const lastIncrement = parseInt(lastOrderNumber.split("_")[1], 10);
      increment = lastIncrement + 1;
    }

    this.orderNumber = `${currentYear}_${increment}`;
  }

  next();
});

const Order: Model<orderDocument> = model<orderDocument>("Order", orderSchema);

export default Order;
