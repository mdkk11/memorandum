import { Document } from '@prisma/client';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { useUpdateFolder } from './useUpdateFolder';

type Props = Pick<Document, 'id'> & { hasDocuments: boolean };

export const UpdateFolder = ({ id, hasDocuments }: Props) => {
  const { onSubmit, isLoading } = useUpdateFolder({ id, hasDocuments });

  return (
    <form onSubmit={onSubmit}>
      <input defaultValue={id} name="id" type="hidden" />
      <SubmitButton iconProps={{ 'aria-label': 'フォルダを削除', type: 'trash', className: 'scale-75' }} isLoading={isLoading}>
        このフォルダを削除する
      </SubmitButton>
    </form>
  );
};
