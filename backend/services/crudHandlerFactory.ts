import { Model } from "mongoose";
import HttpError from "../utils/httpError";
import asyncHandler from "express-async-handler";
import { NOT_FOUND, OK } from "../constants/http.codes";
import { NextFunction, Request, Response } from "express";

const deleteOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "doc deleted successfully",
    });
  });

const updateOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      timestamps: true,
    });

    if (!document) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "doc updated successfully",
      data: {
        data: document,
      },
    });
  });

const getOneDoc = <T>(Model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "success",
      id: req.params.id,
      data: doc,
    });
  });

const getAllDocs = <T>(Model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find();

    res.status(OK).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

export { getAllDocs, updateOneDoc, deleteOneDoc, getOneDoc };
