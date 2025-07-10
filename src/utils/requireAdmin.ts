import { Request, Response, NextFunction } from "express";
import { AuthenticatedUser } from "./types";

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // המרה לטיפוס המאומת
  const user = (req as any).user as AuthenticatedUser;
  //
  console.log("User in requireAdmin:", user);

  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  next();
}
