import { z } from 'zod';

const AuthorSchema = z.object({
  authorId: z.string(),
});

export const DocumentSchema = z.object({
  id: z.string(),
  index: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  isArchive: z.boolean(),
  folderId: z.string(),
  authorId: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export const CreateDocumentSchema = z.object({
  index: z.coerce.number(),
  title: z.string(),
  body: z.string().nullable(),
  isArchive: z.boolean().optional(),
  folderId: z.string(),
});

export const CreateDocumentServerSchema = CreateDocumentSchema.merge(AuthorSchema);

export const UpdateDocumentSchema = z.object({
  id: z.string(),
  index: z.coerce.number().optional(),
  title: z.string().optional(),
  body: z.string().nullish(),
  isArchive: z.boolean().optional(),
  folderId: z.string(),
  updatedAt: z.coerce.date().optional(),
});

export const UpdateDocumentServerSchema = UpdateDocumentSchema.merge(AuthorSchema);

export const DeleteDocumentSchema = z.object({
  id: z.string(),
});

export const DeleteDocumentServerSchema = DeleteDocumentSchema.merge(AuthorSchema);
