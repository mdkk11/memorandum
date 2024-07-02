import React from 'react';
import { Item } from '@/app/(main)/documents/_components/Item';
import { authGuard } from '@/services/authGuard';
import { getArchivedDocuments } from '@/services/documents/getArchivedDocuments';
import { getArchivedFolders } from '@/services/folders/getArchivedFolders';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/DropDownMenu';
import { Icon } from '@/ui/Icons';
import { TrashBoxContent } from './TrashBoxContent';

export const TrashBox = async () => {
  const user = await authGuard();

  const [{ folders }, { documents }] = await Promise.all([getArchivedFolders({ authorId: user.id, isArchive: true }), getArchivedDocuments({ authorId: user.id, isArchive: true })]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full overflow-hidden">
        <Item asChild>
          <button className="mx-1 flex w-full items-center gap-2">
            <Icon size={'sm'} type="trash" />
            Trash Box
          </button>
        </Item>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={0} className="w-[480px] p-2" side="right">
        <TrashBoxContent documents={documents} folders={folders} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
