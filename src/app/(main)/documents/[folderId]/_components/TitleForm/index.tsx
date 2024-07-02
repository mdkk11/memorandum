'use client';

import { Limit } from '@/app/(main)/documents/_const';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Folder } from '@/types/folder';
import { AlertText } from '@/ui/AlertText';
import { Input } from '@/ui/Input';
import { MaxLengthText } from '../../../_components/MaxLengthText';
import { useTitleForm } from './useTitleForm';

export type Props = Pick<Folder, 'id' | 'title'>;

export const TitleForm = ({ ...props }: Props) => {
  const { form, onSubmit, action, errorMessage } = useTitleForm({ ...props });

  return (
    <div className="grid gap-2">
      <form action={action} className="flex items-center gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <input type="hidden" {...form.register('id')} />
        <Input autoFocus className="h-10 grow border-none text-2xl focus-visible:ring-0" placeholder="タイトル" {...form.register('title')} />
        <SubmitButton className="w-fit" isLoading={form.formState.isSubmitting} type="submit" variant={'default'}>
          更新する
        </SubmitButton>
      </form>
      <MaxLengthText className="mr-24 flex justify-end" length={form.watch('title').length} limit={Limit.title} />
      {errorMessage && <AlertText>{errorMessage}</AlertText>}
    </div>
  );
};
