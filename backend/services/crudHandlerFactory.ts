import { Model } from "mongoose";
import HttpError from "../utils/httpError";
import asyncHandler from "express-async-handler";
import { NOT_FOUND, OK } from "../constants/http.codes";
import { NextFunction, Request, Response } from "express";

const deleteOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const document = await Model.findByIdAndDelete(req.params.id);

      if (!document) {
        return next(
          new HttpError(`No ${Model.modelName} found with that ID`, NOT_FOUND)
        );
      }

      res.status(OK).json({
        success: true,
        message: `${Model.modelName} deleted successfully`,
      });
    }
  );

const updateOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        timestamps: true,
      });

      if (!document) {
        return next(
          new HttpError(`No ${Model.modelName} found with that ID`, NOT_FOUND)
        );
      }

      res.status(OK).json({
        success: true,
        message: `${Model.modelName} updated successfully`,
        results: document,
      });
    }
  );

const getOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      let query = Model.findById(req.params.id);

      if (Model.modelName === "User") {
        query = query.select("-password -jwt_secret");
      }

      const document = await query;

      if (!document) {
        return next(new HttpError("No document found with that ID", NOT_FOUND));
      }

      res.status(OK).json(document);
    }
  );

const getAllDocs = <T>(Model: Model<T>) =>
  asyncHandler(
    async (
      req: Request<{}, {}, {}, { page?: number }>,
      res: Response,
      next: NextFunction
    ) => {
      const page = Number(req.query.page) | 1;
      const limit = 20;
      const skip = (page - 1) * limit;

      let query = Model.find().skip(skip).limit(limit);
      if (Model.modelName === "User") {
        query = query.select("-password -jwt_secret");
      }

      const document = await query;

      if (!document.length) {
        return next(new HttpError("No data found", NOT_FOUND));
      }

      const totalResults = await Model.countDocuments();

      res.status(OK).json({
        page,
        results: document,
        totalPages: Math.ceil(totalResults / limit),
        totalResults,
      });
    }
  );

export { getAllDocs, updateOneDoc, deleteOneDoc, getOneDoc };
