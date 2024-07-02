import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { ArchiveListItem } from '../../useTrashBox';
import { deleteDocumentAction, deleteFolderAction } from './action';

export type Props = Pick<ArchiveListItem, 'id'> & { isDocument: boolean };

export const useTrashActionButton = ({ id, isDocument }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const message = isDocument ? 'このドキュメント完全に削除します\n本当によろしいですか？' : 'このフォルダ完全に削除します\n紐づくドキュメントがある場合、同時に削除されます\n本当によろしいですか？';
      if (!window.confirm(message)) {
        return;
      }
      try {
        setIsLoading(true);
        const { status, title } = await (isDocument ? deleteDocumentAction(initialFormState({ id }), formData) : deleteFolderAction(initialFormState({ id }), formData));

        if (status === Status.success) {
          toast.success(`${title}を削除しました`);
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
      } catch (error) {
        toast.error('通信に失敗しました');
      } finally {
        setIsLoading(false);
      }
    },
    [id, isDocument]
  );

  return { onSubmit, isLoading };
};
