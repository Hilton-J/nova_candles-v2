import "dotenv/config";
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
import { errorHandler, notFound } from "./middlewares/error.middleware";
import express, { Response, Request, ErrorRequestHandler } from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Render!!");
});

app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/cart", cartRoutes);
app.use("/api/v2/orders", orderRoutes);
app.use("/api/v2/products", productRoutes);
app.use("/api/v2/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler as ErrorRequestHandler);

app.listen(env.PORT, async () => {
  await connectDB();
  logger.info(`Server running on http://localhost:${env.PORT}`);
});
