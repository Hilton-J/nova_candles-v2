import express from "express";
import "dotenv/config";
import env from "./schemas/envSchema";
import connectDB from "./config/db";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, async () => {
  logger.info(`Server running on http://localhost:${env.PORT}`);
  await connectDB();
});
