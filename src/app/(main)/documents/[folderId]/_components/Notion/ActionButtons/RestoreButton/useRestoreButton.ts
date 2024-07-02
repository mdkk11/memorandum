import React, { useCallback, useState } from 'react';
import { Folder } from '@prisma/client';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { updateFolderAction } from './action';

export type Props = Pick<Folder, 'id'>;

export const useRestoreButton = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, action] = useFormState(updateFolderAction, initialFormState({ id }));

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, title } = await updateFolderAction(initialFormState({ id }), formData);
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
    [id]
  );

  return { action, onSubmit, isLoading };
};
