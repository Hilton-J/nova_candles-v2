import { Document, Types } from "mongoose";

export interface IAddress {
  recipientName: string;
  recipientLastName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface addressDocument extends IAddress, Document {
  _id: Types.ObjectId;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "customer" | "admin";
  shipToAddress: addressDocument[];
  isActive: boolean;
  jwt_secret?: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  omitField<T extends keyof this>(fields: T[] | T): Omit<this, T>;
}

export interface userDocument extends IUser, Document {
  _id: Types.ObjectId;
  omitField<T extends keyof this>(fields: T[] | T): Omit<this, T>;
}

export interface registerUser extends userDocument {
  confirmPassword: string;
}
