import mongoose from "mongoose";
import logger from "../utils/logger";
import env from "../schemas/envSchema";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    } else {
      logger.error(`Error: ${String(error)}`);
    }
    process.exit(1);
  }
};

export default connectDB;
