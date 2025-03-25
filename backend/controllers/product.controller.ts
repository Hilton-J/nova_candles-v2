import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import {
  addReview,
  createProduct,
  getProductByNameAndSize,
} from "../services/product.service";
import { CREATED, OK } from "../constants/http.codes";
import { authRequest } from "../interfaces/user.interface";
import mongoose from "mongoose";
import {
  deleteOneDoc,
  getAllDocs,
  updateOneDoc,
} from "../services/crudHandlerFactory";
import Product from "../models/product.model";

export const getAllProductsHandler = getAllDocs(Product);
export const deleteProductHandler = deleteOneDoc(Product);
export const updateProductHandler = updateOneDoc(Product);
//TODO: Above needs testing

export const createProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await createProduct(req.body);

    res.status(CREATED).json({
      success: true,
      message: "Product added successfully",
    });
  }
);

export const addReviewHandler = asyncHandler(
  async (req: authRequest, res: Response, next: NextFunction) => {
    const { _id } = req.user!;
    const { id } = req.params;

    const document = await addReview(new mongoose.Types.ObjectId(id), {
      ...req.body,
      userId: _id,
    });

    res.status(OK).json({
      success: true,
      message: `Review added successfully`,
      results: document,
    });
  }
);

export const getProductByNameAndSizeHandler = asyncHandler(
  async (
    req: Request<{ name: string }, {}, {}, { size: string }>,
    res: Response
  ) => {
    const document = await getProductByNameAndSize(
      req.params.name,
      req.query.size
    );

    res.status(OK).json(document);
  }
);
