import { Folder } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services/index';
import { FolderIncludeDocuments } from '..';

type Props = Pick<Folder, 'authorId'>;

export async function getAllFolders({ authorId }: Props): Promise<{ folders: FolderIncludeDocuments[] }> {
  const searchParams = new URLSearchParams({
    authorId,
  });

  return fetch(path(`/api/folders?${searchParams.toString()}`), { next: { tags: ['folders/navigation'] } })
    .then(handleSucceed)
    .catch(handleFailed);
}
