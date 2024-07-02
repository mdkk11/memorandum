import { Folder } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services/index';
import { FolderIncludeDocuments } from '..';

type Props = Pick<Folder, 'authorId' | 'isArchive'>;

export async function getArchivedFolders({ authorId, isArchive }: Props): Promise<{ folders: FolderIncludeDocuments[] }> {
  const searchParams = new URLSearchParams({
    authorId,
    ...(isArchive && { isArchive: 'true' }),
  });

  return fetch(path(`/api/folders?${searchParams.toString()}`), { next: { tags: [`folders/isArchive`] } })
    .then(handleSucceed)
    .catch(handleFailed);
}
