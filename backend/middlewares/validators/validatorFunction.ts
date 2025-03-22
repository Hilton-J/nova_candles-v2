import asyncHandler from "express-async-handler";
import { ZodObject } from "zod";

const validator = (schema: ZodObject<any>) =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  });

export default validator;
