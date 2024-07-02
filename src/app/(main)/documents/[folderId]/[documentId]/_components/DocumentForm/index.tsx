'use client';

import React from 'react';
import { Document } from '@prisma/client';
import { MaxLengthText } from '@/app/(main)/documents/_components/MaxLengthText';
import { Limit } from '@/app/(main)/documents/_const';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { AlertText } from '@/ui/AlertText';
import { Input } from '@/ui/Input';
import { Separator } from '@/ui/Separator';
import { Editor } from './Editor';
import { useDocumentForm } from './useDocumentForm';

type Props = Document;

export const DocumentForm = ({ ...props }: Props) => {
  const { form, onSubmit, action, errorMessages } = useDocumentForm({ ...props });

  return (
    <form action={action} className="grid items-center space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <SubmitButton className="ml-auto w-fit" variant={'default'}>
        更新する
      </SubmitButton>
      <input type="hidden" {...form.register('id')} />
      <input type="hidden" {...form.register('folderId')} />
      <div className="grid gap-1">
        <Input autoFocus className="h-10 grow border-none text-2xl focus-visible:ring-0" placeholder="タイトル" {...form.register('title')} />
        <MaxLengthText className="flex justify-end" length={form.watch('title').length} limit={Limit.title} />
        {errorMessages.title && <AlertText>{errorMessages.title}</AlertText>}
      </div>
      <Separator />
      {errorMessages.body && <AlertText>{errorMessages.body}</AlertText>}
      <Editor content={form.getValues('body')} error={errorMessages.body} onUpdate={form.setValue} />
    </form>
  );
};
