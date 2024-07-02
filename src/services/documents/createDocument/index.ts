import { Document } from '@prisma/client';
import { z } from 'zod';
import { CreateDocumentServerSchema } from '@/schemas/document';
import { handleFailed, handleSucceed, path } from '../..';

type Props = z.infer<typeof CreateDocumentServerSchema>;

export async function createDocument(payload: Props): Promise<{ document: Document }> {
  return fetch(path(`/api/documents`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
