import { Folder } from '@prisma/client';
import { ActionButtons } from './ActionButtons';

type Props = Pick<Folder, 'id'>;

export const Notion = ({ id }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 bg-destructive p-3 text-sm text-destructive-foreground" role="alert">
      このフォルダはゴミ箱にあります。
      <div className="flex gap-2">
        <ActionButtons id={id} />
      </div>
    </div>
  );
};
