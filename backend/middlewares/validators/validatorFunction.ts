import { ZodEffects, ZodObject } from "zod";
import asyncHandler from "express-async-handler";

const validator = (schema: ZodObject<any> | ZodEffects<any>) =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  });

export default validator;
