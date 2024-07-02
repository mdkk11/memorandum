import React, { useCallback, useState } from 'react';
import { Document } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { deleteDocumentAction } from './action';

export type Props = Document;

export const useDeleteButton = ({ id, folderId }: Props) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      if (!window.confirm('このドキュメントを完全に削除します\n本当によろしいですか？')) {
        return;
      }
      try {
        setIsLoading(true);
        const { status, title } = await deleteDocumentAction(initialFormState({ id, folderId }), formData);
        if (status === Status.success) {
          toast.success(`${title}を削除しました`);
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
      } catch (error) {
        console.log(error);

        toast.error('通信に失敗しました');
      } finally {
        setIsLoading(false);
      }
      push('/documents');
    },
    [id, folderId, push]
  );

  return { onSubmit, isLoading };
};
