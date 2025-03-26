import { Request } from "express";
import { Document, Types } from "mongoose";

export interface addressDocument extends Document {
  recipientName: string;
  recipientLastName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface userDocument extends Document {
   _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "customer" | "admin";
  shipToAddress: addressDocument[];
  isActive: boolean;
  jwt_secret: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  omitField(fields: string[] | string): any;
}

export interface registerUser extends userDocument {
  confirmPassword: string;
}

export interface authRequest extends Request {
  user?: userDocument;
}
