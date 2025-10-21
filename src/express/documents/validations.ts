// src/express/documents/validations.ts
import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

// POST /documents/case/:caseId/upload
export const uploadDocumentSchema = z.object({
  body: z.object({
    description: z.string().optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({
    caseId: zodMongoObjectId,
  }),
});

// GET /documents/case/:caseId
export const listDocumentsByCaseSchema = z.object({
  body: z.object({}).default({}),
  query: z
    .object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(50),
    })
    .default({}),
  params: z.object({
    caseId: zodMongoObjectId,
  }),
});

// GET /documents/:id/download
export const downloadDocumentSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({
    id: zodMongoObjectId,
  }),
});

// DELETE /documents/:id
export const deleteDocumentSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({
    id: zodMongoObjectId,
  }),
});
