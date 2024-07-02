import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Status } from '@/libs/errors';
import { initialFormState } from '@/libs/state';
import { CreateDocumentSchema } from '@/schemas/document';
import { CreateDocumentInput, Document } from '@/types/document';
import { createDocumentAction } from './action';

export const useAddDocumentButton = ({ ...state }: Pick<Document, 'title' | 'body' | 'folderId' | 'index'>) => {
  const { push } = useRouter();
  const form = useForm({ resolver: zodResolver(CreateDocumentSchema), defaultValues: state, values: state });
  const [, action] = useFormState(createDocumentAction, initialFormState({ ...state }));

  const onSubmit: SubmitHandler<CreateDocumentInput> = useCallback(
    async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      try {
        const { status, id, folderId } = await createDocumentAction(initialFormState({ ...state }), formData);
        if (status === Status.success) {
          toast.success('新しいドキュメントを追加しました');
        } else if (status === Status.error) {
          toast.error('エラーが発生しました');
        }
        push(`/documents/${folderId}/${id}`);
      } catch (error) {
        toast.error('エラーが発生しました');
      }
    },
    [push, state]
  );

  return {
    form,
    action,
    onSubmit,
  };
};
