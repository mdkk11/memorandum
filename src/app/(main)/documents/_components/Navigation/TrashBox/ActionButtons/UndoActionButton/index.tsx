import { IconButton } from '@/app/(main)/documents/_components/IconButton';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { ArchiveListItem } from '../../useTrashBox';
import { useUndoActionButton } from './useUndoActionButton';

type Props = Pick<ArchiveListItem, 'id' | 'folderId'> & { isDocument: boolean };

export const UndoActionButton = ({ ...props }: Props) => {
  const { action, onSubmit, isLoading } = useUndoActionButton({ ...props });

  return (
    <IconButton asChild>
      <form action={action} onSubmit={onSubmit}>
        <input defaultValue={props.id} name="id" type="hidden" />
        <input defaultValue={props.folderId} name="folderId" type="hidden" />
        <SubmitButton iconProps={{ 'aria-label': '復元する', size: 'sm', type: 'undo' }} isLoading={isLoading} />
      </form>
    </IconButton>
  );
};
