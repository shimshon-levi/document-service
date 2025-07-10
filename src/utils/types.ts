export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

import { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "admin" | "client";
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface AuthenticatedRequestWithFile extends AuthenticatedRequest {
  file: Express.Multer.File;
}
