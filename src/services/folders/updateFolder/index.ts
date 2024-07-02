import { z } from 'zod';
import { UpdateFolderServerSchema } from '@/schemas/folder';
import { handleFailed, handleSucceed, path } from '@/services/index';
import { FolderIncludeDocuments } from '..';

export const updateFolderSchema = z.object({
  id: z.string(),
  index: z.number().optional(),
  title: z.string().optional(),
  isArchive: z.boolean().optional(),
  authorId: z.string(),
  updatedAt: z.coerce.date().optional(),
});

type Props = z.infer<typeof UpdateFolderServerSchema>;

export async function updateFolder({ id, ...props }: Props): Promise<{ folder: FolderIncludeDocuments }> {
  return fetch(path(`/api/folders/${id}`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...props }),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
