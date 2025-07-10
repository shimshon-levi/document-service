import { Router } from "express";
import { documentsRouter } from "./documents/router";

export const appRouter = Router();

// appRouter.get("/health", (_, res) => res.json({ status: "ok" }));

appRouter.use("/documents", documentsRouter);

appRouter.get(["/isAlive", "/isalive", "/health"], (req, res) => {
  res.status(200).json({ status: "ok" });
});
// init
