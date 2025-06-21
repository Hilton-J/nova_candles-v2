import { ZodError } from "zod";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} from "../constants/http.codes";
import logger from "../utils/logger";
import env from "../schemas/envSchema";
import HttpError from "../utils/httpError";
import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(`Not Found - ${req.originalUrl}`, NOT_FOUND);
  next(error);
};

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: BAD_REQUEST,
    body: {
      errors,
      message: "Validation Error", // Generic message, individual messages are in the errors array
    },
  };
};

export const errorHandler = (
  err: unknown | Error | ZodError | HttpError,
  req: Request,
  res: Response,
): unknown => {

  logger.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: env.NODE_ENV === "production" ? undefined : err.stack,
    });
  }

  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    stack: env.NODE_ENV === "production"
      ? null
      : typeof err === "object" && err !== null && "stack" in err
        ? (err as Error).stack
        : undefined,
  });
};
