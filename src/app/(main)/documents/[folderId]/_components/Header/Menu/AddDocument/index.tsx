import { Document } from '@prisma/client';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { useAddDocument } from './useAddDocument';

type Props = Pick<Document, 'id' | 'index'>;

export const AddDocument = ({ id, index }: Props) => {
  const state = {
    title: 'New Document',
    body: '',
    index,
    folderId: id,
  };

  const { action, onSubmit, isLoading } = useAddDocument({ ...state });

  return (
    <form action={action} onSubmit={onSubmit}>
      <input defaultValue={state.folderId} name="folderId" type="hidden" />
      <input defaultValue={state.title} name="title" type="hidden" />
      <input defaultValue={state.body} name="body" type="hidden" />
      <input defaultValue={state.index} name="index" type="hidden" />
      <SubmitButton iconProps={{ 'aria-label': 'ドキュメントを追加', type: 'circlePlus', className: 'scale-75 fill-white' }} isLoading={isLoading}>
        ドキュメントを追加する
      </SubmitButton>
    </form>
  );
};
