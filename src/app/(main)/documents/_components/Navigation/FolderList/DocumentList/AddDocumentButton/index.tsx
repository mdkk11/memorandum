'use client';

import { SubmitButton } from '@/app/_components/SubmitButton';
import { useAddDocumentButton } from './useAddDocumentButton';

/**
 * @package
 */
export const AddDocumentButton = ({ id, length }: { id: string; length: number }) => {
  const state = { title: 'New Document', body: '', index: length + 1, folderId: id };
  const { action, form, onSubmit } = useAddDocumentButton({ ...state });
  return (
    <form action={action} className="ml-auto grid place-items-center rounded-sm hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600" onSubmit={form.handleSubmit(onSubmit)}>
      <input className="hidden" {...form.register('title')} />
      <input className="hidden" {...form.register('body')} />
      <input className="hidden" {...form.register('index')} />
      <input className="hidden" {...form.register('folderId')} />
      <SubmitButton iconProps={{ 'aria-label': 'Add Document', className: 'scale-[0.8]', type: 'plus' }} isLoading={form.formState.isSubmitting} />
    </form>
  );
};
