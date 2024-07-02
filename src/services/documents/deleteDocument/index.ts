import { Document } from '@prisma/client';
import { z } from 'zod';
import { DeleteDocumentServerSchema } from '@/schemas/document';
import { path, handleFailed, handleSucceed } from '@/services/index';

type Props = z.infer<typeof DeleteDocumentServerSchema>;

export async function deleteDocument({ id, authorId }: Props): Promise<{ document: Document }> {
  return fetch(path(`/api/documents/${id}?authorId=${authorId}`), {
    method: 'DELETE',
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
