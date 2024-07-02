import { z } from 'zod';
import { CreateFolderSchema, DeleteFolderSchema, FolderSchema, UpdateFolderSchema } from '@/schemas/folder';

export type Folder = z.infer<typeof FolderSchema>;

export type CreateFolderInput = z.infer<typeof CreateFolderSchema>;

export type UpdateFolderInput = z.infer<typeof UpdateFolderSchema>;

export type DeleteFolderInput = z.infer<typeof DeleteFolderSchema>;
