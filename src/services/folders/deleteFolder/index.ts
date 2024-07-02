import { z } from 'zod';
import { DeleteDocumentServerSchema } from '@/schemas/document';
import { path, handleFailed, handleSucceed } from '@/services/index';
import { FolderIncludeDocuments } from '..';

type Props = z.infer<typeof DeleteDocumentServerSchema>;

export async function deleteFolder({ id, authorId }: Props): Promise<{ folder: FolderIncludeDocuments }> {
  return fetch(path(`/api/folders/${id}?authorId=${authorId}`), {
    method: 'DELETE',
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
