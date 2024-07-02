import { z } from 'zod';

const AuthorSchema = z.object({
  authorId: z.string(),
});

export const FolderSchema = z.object({
  id: z.string(),
  index: z.number(),
  title: z.string(),
  isArchive: z.boolean(),
  authorId: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export const CreateFolderSchema = z.object({
  index: z.coerce.number(),
  title: z.string(),
  isArchive: z.boolean().optional(),
});

export const CreateFolderServerSchema = CreateFolderSchema.merge(AuthorSchema);

export const UpdateFolderSchema = z.object({
  id: z.string(),
  index: z.coerce.number().optional(),
  title: z.string().optional(),
  isArchive: z.boolean().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UpdateFolderServerSchema = UpdateFolderSchema.merge(AuthorSchema);

export const DeleteFolderSchema = z.object({
  id: z.string(),
});

export const DeleteFolderServerSchema = DeleteFolderSchema.merge(AuthorSchema);
