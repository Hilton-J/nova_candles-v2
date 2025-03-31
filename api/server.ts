import "dotenv/config";
import express from "express";
import connectDB from "../backend/config/db";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.route";
import userRoutes from "../backend/routes/user.route";
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
app.use("/apiv2/user", userRoutes);
app.use("/apiv2/order", orderRoutes);
app.use("/apiv2/product", productRoutes);
app.use("/apiv2/payment", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
