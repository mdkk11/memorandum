import React, { useCallback, useState } from 'react';
import { Folder } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { deleteFolderAction } from './action';

export type Props = Pick<Folder, 'id'>;

export const useDeleteButton = ({ id }: Props) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      if (!window.confirm('このフォルダを完全に削除します\n紐づくドキュメントがある場合、同時に削除されます\n本当によろしいですか？')) {
        return;
      }
      try {
        setIsLoading(true);
        const { status, title } = await deleteFolderAction(initialFormState({ id }), formData);
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
    [id, push]
  );

  return { onSubmit, isLoading };
};
