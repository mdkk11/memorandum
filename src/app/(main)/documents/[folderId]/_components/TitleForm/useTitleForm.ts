import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Folder } from '@prisma/client';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Limit } from '@/app/(main)/documents/_const';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { UpdateFolderInput } from '@/types/folder';
import { updateFolderTitle } from './action';

type Props = Pick<Folder, 'id' | 'title'>;

const schema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, {
      message: 'タイトルは必須です',
    })
    .max(Limit.title, `タイトルは${Limit.title}文字以下の必要があります`),
});

export const useTitleForm = ({ ...state }: Props) => {
  const [formState, action] = useFormState(updateFolderTitle, initialFormState({ ...state }));

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: state,
    values: state,
  });

  const validateSameValue = useCallback(() => {
    return form.getValues('title') === state.title;
  }, [form, state.title]);

  const onSubmit: SubmitHandler<UpdateFolderInput> = useCallback(
    async (data) => {
      if (validateSameValue()) {
        return;
      }
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        const { status } = await updateFolderTitle(initialFormState({ ...state }), formData);
        if (status === Status.success) {
          toast.success('タイトルを変更しました');
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
      } catch (error) {
        toast.error('問題が発生しました');
      }
    },
    [state, validateSameValue]
  );

  const errorMessage = form.formState.errors['title']?.message ?? formState?.error?.fieldErrors?.['title'].message;

  return {
    action,
    formState,
    form,
    onSubmit,
    errorMessage,
  };
};
