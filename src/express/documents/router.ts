// documents/router.ts
import { Router } from "express";
import { DocumentController } from "./controller";
import { authMiddleware } from "../../utils/authMiddleware";
import { wrapController, validateRequest } from "../../utils/express/wrappers";
import {
  uploadDocumentSchema,
  getDocumentByIdSchema,
  getDocumentsByCaseSchema,
} from "./validations";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
export const documentsRouter = Router();

documentsRouter.use(authMiddleware);

documentsRouter.post(
  "/",
  upload.single("file"),
  validateRequest(uploadDocumentSchema),
  wrapController(DocumentController.upload)
);

documentsRouter.get(
  "/case/:caseId",
  validateRequest(getDocumentsByCaseSchema),
  wrapController(DocumentController.getByCase)
);

documentsRouter.get(
  "/:id",
  validateRequest(getDocumentByIdSchema),
  wrapController(DocumentController.getById)
);

documentsRouter.get(
  "/:id/download",
  validateRequest(getDocumentByIdSchema),
  wrapController(DocumentController.download)
);

documentsRouter.delete(
  "/:id",
  validateRequest(getDocumentByIdSchema),
  wrapController(DocumentController.delete)
);
