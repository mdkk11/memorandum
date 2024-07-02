import React, { useCallback, useState } from 'react';
import { Document } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { updateDocumentAction } from './action';

export type Props = Pick<Document, 'id' | 'folderId'>;

export const useUpdateDocument = ({ id, folderId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, title } = await updateDocumentAction(initialFormState({ id }), formData);
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
      push(`/documents/${folderId}`);
    },
    [folderId, id, push]
  );

  return { onSubmit, isLoading };
};
