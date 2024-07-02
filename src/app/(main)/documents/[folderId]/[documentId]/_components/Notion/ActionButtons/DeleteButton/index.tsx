import React from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useDeleteButton } from './useDeleteButton';

export const DeleteButton = ({ ...props }: Props) => {
  const { onSubmit } = useDeleteButton({ ...props });
  return (
    <form onSubmit={onSubmit}>
      <input defaultValue={props.id} name="id" type="hidden" />
      <input defaultValue={props.folderId} name="folderId" type="hidden" />
      <SubmitButton className="whitespace-nowrap bg-destructive" size={'sm'} variant={'outline'}>
        ゴミ箱から削除
      </SubmitButton>
    </form>
  );
};
