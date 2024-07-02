import React from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useUpdateDocument } from './useUpdateDocument';

export const UpdateDocument = ({ ...props }: Props) => {
  const { onSubmit, isLoading } = useUpdateDocument({ ...props });
  return (
    <form onSubmit={onSubmit}>
      <input defaultValue={props.id} name="id" type="hidden" />
      <input defaultValue={props.folderId} name="folderId" type="hidden" />
      <SubmitButton iconProps={{ 'aria-label': 'ドキュメントを削除', type: 'trash', className: 'scale-75' }} isLoading={isLoading}>
        このドキュメントを削除する
      </SubmitButton>
    </form>
  );
};
