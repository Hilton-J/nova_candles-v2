import "dotenv/config";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import logger from "./utils/logger";
import env from "./schemas/envSchema";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import cartRoutes from "./routes/cart.route";
import orderRoutes from "./routes/order.route";
import productRoutes from "./routes/product.route";
import paymentRoutes from "./routes/payment.route";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", async (req: Request, res: Response) => {
  res.send("Server deployed successfully");
});

app.use("/apiv2/auth", authRoutes);
app.use("/apiv2/users", userRoutes);
app.use("/apiv2/cart", cartRoutes);
app.use("/apiv2/orders", orderRoutes);
app.use("/apiv2/products", productRoutes);
app.use("/apiv2/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, async () => {
  await connectDB();
  logger.info(`Server running on http://localhost:${env.PORT}`);
});
