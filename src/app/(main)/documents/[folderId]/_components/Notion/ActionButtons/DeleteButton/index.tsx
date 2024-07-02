import React from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useDeleteButton } from './useDeleteButton';

export const DeleteButton = ({ id }: Props) => {
  const { onSubmit } = useDeleteButton({ id });
  return (
    <form onSubmit={onSubmit}>
      <input defaultValue={id} name="id" type="hidden" />
      <SubmitButton className="whitespace-nowrap bg-destructive" size={'sm'} variant={'outline'}>
        ゴミ箱から削除
      </SubmitButton>
    </form>
  );
};
