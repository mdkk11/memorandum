import { z } from 'zod';
import { UpdateDocumentServerSchema } from '@/schemas/document';
import { DocumentIncludeFolder } from '@/services/folders';
import { handleFailed, handleSucceed, path } from '../..';

export const updateDocumentSchema = z.object({
  id: z.string(),
  index: z.number().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  isArchive: z.boolean().optional(),
  folderId: z.string(),
  updatedAt: z.coerce.date().optional(),
});

type Props = z.infer<typeof UpdateDocumentServerSchema>;

export async function updateDocument({ id, ...props }: Props): Promise<{ document: DocumentIncludeFolder }> {
  return fetch(path(`/api/documents/${id}`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...props }),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
