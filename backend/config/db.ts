import mongoose from "mongoose";
import env from "../schemas/envSchema";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    process.exit(1); //1 code mean exit with failure, 0 means success
  }
};

export default connectDB;
