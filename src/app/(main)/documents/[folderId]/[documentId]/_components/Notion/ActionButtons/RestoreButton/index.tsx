import React from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useRestoreButton } from './useRestoreButton';

export const RestoreButton = ({ ...props }: Props) => {
  const { action, onSubmit, isLoading } = useRestoreButton({ ...props });
  return (
    <form action={action} onSubmit={onSubmit}>
      <input defaultValue={props.id} name="id" type="hidden" />
      <input defaultValue={props.folderId} name="folderId" type="hidden" />
      <SubmitButton className="whitespace-nowrap bg-destructive" isLoading={isLoading} size={'sm'} variant={'outline'}>
        ページを復元
      </SubmitButton>
    </form>
  );
};
