import React from 'react';
import { IconButton } from '@/app/(main)/documents/_components/IconButton';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useTrashActionButton } from './useTrashActionButton';

export const TrashActionButton = ({ ...props }: Props) => {
  const { onSubmit, isLoading } = useTrashActionButton({ ...props });
  return (
    <IconButton asChild>
      <form onSubmit={onSubmit}>
        <input defaultValue={props.id} name="id" type="hidden" />
        <SubmitButton iconProps={{ 'aria-label': '削除する', size: 'sm', type: 'trash' }} isLoading={isLoading} />
      </form>
    </IconButton>
  );
};
