import React, { useCallback, useState } from 'react';
import { Document } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { addDocumentAction } from './action';

type Props = Partial<Document>;

export const useAddDocument = ({ ...state }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, action] = useFormState(addDocumentAction, initialFormState({ ...state }));
  const { push } = useRouter();
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, folderId, id } = await addDocumentAction(initialFormState({ ...state }), formData);
        if (status === Status.success) {
          toast.success(`ドキュメントを追加しました`);
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
        push(`/documents/${folderId}/${id}`);
      } catch (error) {
        console.log(error);
        toast.error('通信に失敗しました');
      } finally {
        setIsLoading(false);
      }
    },
    [push, state]
  );

  return { action, onSubmit, isLoading };
};
