import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Document } from '@prisma/client';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Limit } from '@/app/(main)/documents/_const';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { updateDocumentContentAction } from './action';

type Props = Document;

const schema = z.object({
  id: z.string(),
  folderId: z.string(),
  title: z
    .string()
    .min(1, {
      message: 'タイトルは必須です',
    })
    .max(Limit.title, `タイトルは${Limit.title}文字以下の必要があります`),
  body: z.string().max(Limit.body, `本文は${Limit.body}文字以下の必要があります`).nullable(),
});

export type DocumentFormType = z.infer<typeof schema>;

export const useDocumentForm = ({ ...props }: Props) => {
  const [formState, action] = useFormState(updateDocumentContentAction, initialFormState({ ...props }));
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: props.id,
      folderId: props.folderId,
      title: props.title,
      body: props.body,
    },
  });

  const onSubmit: SubmitHandler<DocumentFormType> = useCallback(
    async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      try {
        const { status } = await updateDocumentContentAction(initialFormState({ ...props }), formData);
        if (status === Status.success) {
          toast.success('更新しました');
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
      } catch (error) {
        toast.error('問題が発生しました');
      }
    },
    [props]
  );

  const errorMessages = {
    title: form.formState.errors['title']?.message ?? formState?.error?.fieldErrors?.['title'].message,
    body: form.formState.errors['body']?.message ?? formState?.error?.fieldErrors?.['body'].message,
  };

  return { form, action, onSubmit, errorMessages };
};
