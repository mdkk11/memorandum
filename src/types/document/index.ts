import { z } from 'zod';
import { CreateDocumentSchema, DeleteDocumentSchema, DocumentSchema, UpdateDocumentSchema } from '@/schemas/document';

export type Document = z.infer<typeof DocumentSchema>;

export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;

export type UpdateDocumentInput = z.infer<typeof UpdateDocumentSchema>;

export type DeleteDocumentInput = z.infer<typeof DeleteDocumentSchema>;
