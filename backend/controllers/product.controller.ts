import { Types } from "mongoose";
import {
  addImage,
  addReview,
  createProduct,
  getProductByNameAndSize,
} from "../services/product.service";
import {
  getOneDoc,
  getAllDocs,
  updateOneDoc,
  deleteOneDoc,
} from "../services/crudHandlerFactory";
import Product from "../models/product.model";
import asyncHandler from "express-async-handler";
import { CREATED, OK } from "../constants/http.codes";
import { NextFunction, Request, Response } from "express";
import { userDocument } from "../interfaces/user.interface";

export const getProductByIdHandler = getOneDoc(Product);
export const getAllProductsHandler = getAllDocs(Product);
export const deleteProductHandler = deleteOneDoc(Product);
export const updateProductHandler = updateOneDoc(Product);

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
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.user as userDocument;

    const document = await addReview(new Types.ObjectId(req.params.id), {
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

export const addImageHandler = asyncHandler(
  async (
    req: Request<{ id: string }, {}, { images: string }>,
    res: Response
  ) => {
    const document = await addImage(
      new Types.ObjectId(req.params.id),
      req.body.images
    );

    res.status(OK).json({
      success: true,
      message: `Image added successfully`,
      results: document,
    });
  }
);
