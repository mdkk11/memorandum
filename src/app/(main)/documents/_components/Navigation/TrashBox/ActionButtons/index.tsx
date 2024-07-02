import { ArchiveListItem } from '../useTrashBox';
import { TrashActionButton } from './TrashActionButton';
import { UndoActionButton } from './UndoActionButton';

type Props = Pick<ArchiveListItem, 'id' | 'folderId'> & { isDocument: boolean };

export const ActionButtons = ({ ...props }: Props) => {
  return (
    <div className="flex gap-1">
      <UndoActionButton {...props} />
      <TrashActionButton {...props} />
    </div>
  );
};
