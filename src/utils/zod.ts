import { Request } from "express";
import { AnyZodObject, z } from "zod";
import { Prettify } from "./types.js";
import { AuthenticatedRequest } from "./types.js";

// בסיס: בקשה עם סכימות zod
export type TypedRequest<T extends AnyZodObject> = Prettify<
  Request<
    z.infer<T>["params"],
    unknown,
    z.infer<T>["body"],
    z.infer<T>["query"]
  >
>;

// משולב עם משתמש מאומת
export type TypedRequestWithUser<T extends AnyZodObject> = Prettify<
  TypedRequest<T> & { user: AuthenticatedRequest["user"] }
>;

// בקשה עם סכימות + משתמש + קובץ
export type TypedRequestWithUserAndFile<T extends AnyZodObject> = Prettify<
  TypedRequestWithUser<T> & { file: Express.Multer.File }
>;

// helper: מזהה אובייקט MongoDB
export const zodMongoObjectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
