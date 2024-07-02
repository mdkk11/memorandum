import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Folder } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { CreateFolderSchema } from '@/schemas/folder';
import { CreateFolderInput } from '@/types/folder';
import { createFolderAction } from './action';

/**
 * @package
 */
export const useAddFolderButton = ({ ...state }: Pick<Folder, 'index' | 'title'>) => {
  const { push } = useRouter();
  const form = useForm({ resolver: zodResolver(CreateFolderSchema), defaultValues: state, values: state });
  const [, action] = useFormState(createFolderAction, initialFormState({ ...state }));

  const onSubmit: SubmitHandler<CreateFolderInput> = useCallback(
    async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        const { status, id } = await createFolderAction(initialFormState({ ...state }), formData);
        if (status === Status.success) {
          toast.success('新しいフォルダを作成しました');
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
        push(`/documents/${id}`);
      } catch (error) {
        toast.error('エラーが発生しました');
      }
    },
    [push, state]
  );

  return {
    form,
    onSubmit,
    action,
  };
};
