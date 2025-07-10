// documents/controller.ts
import { Response } from "express";
import {
  TypedRequestWithUser,
  TypedRequestWithUserAndFile,
} from "../../utils/zod";
import { DocumentManager } from "./manager";
import {
  uploadDocumentSchema,
  getDocumentByIdSchema,
  getDocumentsByCaseSchema,
} from "./validations";
import path from "path";
import fs from "fs";
import { Types } from "mongoose";

export class DocumentController {
  static async upload(
    req: TypedRequestWithUserAndFile<typeof uploadDocumentSchema>,
    res: Response
  ) {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "File is required" });

    const { caseId, description } = req.body;

    const document = await DocumentManager.uploadDocument({
      caseId: new Types.ObjectId(caseId),
      uploadedBy: new Types.ObjectId(req.user.id),
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      description,
    });

    return res.status(201).json(document);
  }

  static async getByCase(
    req: TypedRequestWithUser<typeof getDocumentsByCaseSchema>,
    res: Response
  ) {
    const documents = await DocumentManager.getDocumentsByCaseId(
      req.params.caseId
    );
    res.json(documents);
  }

  static async getById(
    req: TypedRequestWithUser<typeof getDocumentByIdSchema>,
    res: Response
  ) {
    const document = await DocumentManager.getDocumentById(req.params.id);
    res.json(document);
  }

  static async download(
    req: TypedRequestWithUser<typeof getDocumentByIdSchema>,
    res: Response
  ) {
    const document = await DocumentManager.getDocumentById(req.params.id);
    if (!document) return res.sendStatus(404);

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      document.storedName
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.download(filePath, document.originalName);
  }

  static async delete(
    req: TypedRequestWithUser<typeof getDocumentByIdSchema>,
    res: Response
  ) {
    await DocumentManager.deleteDocument(req.params.id);
    res.sendStatus(204);
  }
}
