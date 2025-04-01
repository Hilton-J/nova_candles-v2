import {
  productDocument,
  reviewDocument,
} from "../interfaces/product.interface";
import { model, Model, Schema } from "mongoose";

const reviewSchema = new Schema<reviewDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  comment: String,
  date: { type: Date, default: Date.now },
});

const productSchema = new Schema<productDocument>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    type: { type: String, required: true },
    images: [String],
    reviews: [reviewSchema],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ productName: 1, size: 1 });

const Product: Model<productDocument> = model<productDocument>(
  "Product",
  productSchema
);

export default Product;
