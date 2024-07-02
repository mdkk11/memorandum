import { Folder } from '@prisma/client';
import { z } from 'zod';
import { CreateFolderServerSchema } from '@/schemas/folder';
import { handleFailed, handleSucceed, path } from '../..';

type Props = z.infer<typeof CreateFolderServerSchema>;

export async function createFolder(payload: Props): Promise<{ folder: Folder }> {
  return fetch(path(`/api/folders`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
