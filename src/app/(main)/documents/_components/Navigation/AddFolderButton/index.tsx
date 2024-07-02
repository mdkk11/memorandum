'use client';

import React from 'react';
import { Item } from '@/app/(main)/documents/_components/Item';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { useAddFolderButton } from './useAddFolderButton';

type Props = {
  length: number;
};

/**
 * @package
 */
export const AddFolderButton = React.memo(function AddFolderButton({ length }: Props) {
  const state = { title: 'New Folder', index: length + 1 };
  const { action, form, onSubmit } = useAddFolderButton({ ...state });

  return (
    <Item asChild>
      <form action={action} className="mx-1 flex w-full items-center overflow-hidden" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="hidden" {...form.register('title')} />
        <input className="hidden" {...form.register('index')} />
        <SubmitButton iconProps={{ 'aria-label': 'フォルダを追加', type: 'circlePlus', className: 'fill-white', size: 'sm' }} isLoading={form.formState.isSubmitting}>
          Add Folder
        </SubmitButton>
      </form>
    </Item>
  );
});
