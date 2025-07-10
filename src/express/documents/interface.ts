import { Types } from "mongoose";

export interface IDocument {
  caseId: Types.ObjectId;
  uploadedBy: Types.ObjectId; // user id
  originalName: string; // שם קובץ מקורי
  storedName: string; // השם שנשמר בשרת
  mimeType: string; // image/png, application/pdf וכו’
  size: number; // גודל בבייטים
  description?: string; // תיאור כללי
  createdAt?: Date;
}
