import React, { useCallback, useState } from 'react';
import { Document } from '@prisma/client';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { updateDocumentAction } from './action';

export type Props = Document;

export const useRestoreButton = ({ ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, action] = useFormState(updateDocumentAction, initialFormState({ ...props }));

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, title } = await updateDocumentAction(initialFormState({ ...props }), formData);
        if (status === Status.success) {
          toast.success(`${title}を復元しました`);
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
      } catch (error) {
        toast.error('通信に失敗しました');
      } finally {
        setIsLoading(false);
      }
    },
    [props]
  );

  return { action, onSubmit, isLoading };
};
