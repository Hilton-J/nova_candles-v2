import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import logger from "./utils/logger";
import env from "./schemas/envSchema";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, async () => {
  logger.info(`Server running on http://localhost:${env.PORT}`);
  await connectDB();
});
