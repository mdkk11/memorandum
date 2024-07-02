import { handleFailed, handleSucceed, path } from '@/services/index';
import { PaginationProps } from '@/ui/Pagination';
import { FolderIncludeDocuments } from '..';

type Props = {
  page?: string;
  take?: string;
  orderBy?: string;
  isArchive?: boolean;
  authorId: string;
  folderId: string;
};

export async function getFolderById({ page, take, orderBy, isArchive, authorId, folderId }: Props): Promise<{ folder: FolderIncludeDocuments; pagination: PaginationProps }> {
  const searchParams = new URLSearchParams({
    ...(page && { page }),
    ...(take && { take }),
    ...(orderBy && { orderBy }),
    ...(isArchive && { isArchive: 'true' }),
    authorId,
  });

  return fetch(path(`/api/folders/${folderId}?${searchParams.toString()}`), { next: { tags: [`folders/${folderId}`] } })
    .then(handleSucceed)
    .catch(handleFailed);
}
