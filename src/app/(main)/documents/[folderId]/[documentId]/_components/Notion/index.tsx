import { Document } from '@prisma/client';
import { ActionButtons } from './ActionButtons';

type Props = Document;

export const Notion = ({ ...props }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 bg-destructive p-3 text-sm text-destructive-foreground">
      このドキュメントはゴミ箱にあります。
      <div className="flex gap-2">
        <ActionButtons {...props} />
      </div>
    </div>
  );
};
