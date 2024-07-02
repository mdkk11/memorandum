import React, { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { ArchiveListItem } from '../../useTrashBox';
import { updateDocumentAction, updateFolderAction } from './action';

export type Props = Pick<ArchiveListItem, 'id'> & { isDocument: boolean };

export const useUndoActionButton = ({ id, isDocument }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, action] = useFormState(isDocument ? updateDocumentAction : updateFolderAction, initialFormState({ id }));
  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        setIsLoading(true);
        const { status, title } = await (isDocument ? updateDocumentAction(initialFormState({ id }), formData) : updateFolderAction(initialFormState({ id }), formData));

        if (status === Status.success) {
          toast.success(`${title}を移動しました`);
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

  return { action, onSubmit, isLoading };
};
