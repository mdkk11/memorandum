import React, { useCallback, useState } from 'react';
import { Document } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { updateFolderAction } from './action';

type Props = Pick<Document, 'id'> & { hasDocuments: boolean };

export const useUpdateFolder = ({ id, hasDocuments }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (hasDocuments && !window.confirm('紐づくドキュメントも同時にゴミ箱に移動されます\n本当によろしいですか？')) {
        return;
      }
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, title } = await updateFolderAction(initialFormState({ id }), formData);
        if (status === Status.success) {
          toast.success(`${title}をゴミ箱に移動しました`);
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
        push('/documents');
      } catch (error) {
        toast.error('通信に失敗しました');
      } finally {
        setIsLoading(false);
      }
    },
    [hasDocuments, id, push]
  );

  return { onSubmit, isLoading };
};
