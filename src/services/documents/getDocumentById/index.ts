import { handleFailed, handleSucceed, path } from '@/services/index';
import { DocumentIncludeFolder } from '..';

type Props = {
  documentId: string;
  authorId: string;
};

export async function getDocumentById({ documentId, authorId }: Props): Promise<{ document: DocumentIncludeFolder }> {
  const searchParams = new URLSearchParams({
    authorId,
  });
  return fetch(path(`/api/documents/${documentId}?${searchParams.toString()}`), {
    next: { tags: [`documents/${documentId}`] },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
