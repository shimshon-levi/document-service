import { DocumentModel } from "./model";
import { IDocument } from "./interface";

export class DocumentManager {
  static async uploadDocument(data: IDocument) {
    const document = await DocumentModel.create(data);
    return document;
  }

  static async getDocumentsByCaseId(caseId: string) {
    return await DocumentModel.find({ caseId }).populate("uploadedBy");
  }

  static async getDocumentById(id: string) {
    return await DocumentModel.findById(id).populate("uploadedBy");
  }

  static async deleteDocument(id: string) {
    return await DocumentModel.findByIdAndDelete(id);
  }
}
