import { userDocument } from "./user.interface";

declare module "express" {
  interface Request {
    user?: userDocument;
  }
}
