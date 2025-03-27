import { Model, model, Schema } from "mongoose";
import { paymentDocument } from "../interfaces/payment.interface";

const paymentSchema = new Schema<paymentDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentMethod: { type: String, required: true },
    cardBrand: { type: String, required: true },
    last4Digits: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Payment: Model<paymentDocument> = model<paymentDocument>(
  "Payment",
  paymentSchema
);

export default Payment;
