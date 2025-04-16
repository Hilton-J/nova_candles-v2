import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "../backend/config/db";
import authRoutes from "../backend/routes/auth.route";
import userRoutes from "../backend/routes/user.route";
import cartRoutes from "../backend/routes/cart.route";
import orderRoutes from "../backend/routes/order.route";
import productRoutes from "../backend/routes/product.route";
import paymentRoutes from "../backend/routes/payment.route";
import { errorHandler, notFound } from "../backend/middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

app.use("/apiv2/auth", authRoutes);
app.use("/apiv2/users", userRoutes);
app.use("/apiv2/cart", cartRoutes);
app.use("/apiv2/orders", orderRoutes);
app.use("/apiv2/products", productRoutes);
app.use("/apiv2/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
