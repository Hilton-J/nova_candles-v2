import { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

const validator = (
  schema: ZodObject<ZodRawShape> | ZodEffects<ZodTypeAny>
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  });

export default validator;
