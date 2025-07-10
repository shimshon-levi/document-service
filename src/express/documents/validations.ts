// documents/validations.ts
import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    caseId: zodMongoObjectId,
    description: z.string().optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

export const getDocumentByIdSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({
    id: zodMongoObjectId,
  }),
});

export const getDocumentsByCaseSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({
    caseId: zodMongoObjectId,
  }),
});
