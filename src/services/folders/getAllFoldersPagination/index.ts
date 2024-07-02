import { PaginationProps } from '@/libs/pagination';
import { FoldersWithDocumentsCount } from '..';
import { handleFailed, handleSucceed, path } from '../..';

type Props = {
  page?: string;
  take?: string;
  orderBy?: string;
  authorId: string;
};

export async function getAllFoldersWithPagination({ page, take, orderBy, authorId }: Props): Promise<{ folders: FoldersWithDocumentsCount[]; pagination: PaginationProps }> {
  const searchParams = new URLSearchParams({
    ...(page && { page }),
    ...(take && { take }),
    ...(orderBy && { orderBy }),
    authorId,
  });

  return fetch(path(`/api/folders?${searchParams.toString()}`), { next: { tags: [`folders`] } })
    .then(handleSucceed)
    .catch(handleFailed);
}
