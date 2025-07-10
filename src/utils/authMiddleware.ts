import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AuthenticatedUser } from "./types";
import { Response, NextFunction, Request } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      config.authentication.secret
    ) as AuthenticatedUser;

    console.log("✅ Token payload:", payload);

    (req as any).user = payload;

    next();
  } catch (error) {
    console.error("❌ JWT Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
