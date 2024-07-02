import { Document } from '@prisma/client';
import { handleFailed, handleSucceed, path } from '@/services/index';
import { DocumentIncludeFolder } from '..';

type Props = Pick<Document, 'authorId' | 'isArchive'>;

export async function getArchivedDocuments({ authorId, isArchive }: Props): Promise<{ documents: DocumentIncludeFolder[] }> {
  const searchParams = new URLSearchParams({
    authorId,
    ...(isArchive && { isArchive: 'true' }),
  });

  return fetch(path(`/api/documents?${searchParams.toString()}`), { next: { tags: [`documents/isArchive`] } })
    .then(handleSucceed)
    .catch(handleFailed);
}
