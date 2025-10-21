import mongoose, { Schema, Types } from "mongoose";

const documentSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalName: { type: String, required: true, trim: true },
    storedName: { type: String, required: true }, // שם הקובץ על הדיסק/ענן
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },

    description: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

documentSchema.index({ caseId: 1, createdAt: -1 });

export const DocumentModel = mongoose.model("Document", documentSchema);

export type DocumentId = Types.ObjectId;
