import React from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { Props, useRestoreButton } from './useRestoreButton';

export const RestoreButton = ({ id }: Props) => {
  const { action, onSubmit, isLoading } = useRestoreButton({ id });
  return (
    <form action={action} onSubmit={onSubmit}>
      <input defaultValue={id} name="id" type="hidden" />
      <SubmitButton className="whitespace-nowrap bg-destructive" isLoading={isLoading} size={'sm'} variant={'outline'}>
        ページを復元
      </SubmitButton>
    </form>
  );
};
