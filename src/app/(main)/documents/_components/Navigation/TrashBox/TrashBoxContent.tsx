'use client';

import React from 'react';
import { DocumentIncludeFolder, FolderIncludeDocuments } from '@/services/folders';
import { Input } from '@/ui/Input';
import { ArchiveList } from './ArchiveList';
import { useTrashBox } from './useTrashBox';

type Props = {
  folders: FolderIncludeDocuments[];
  documents: DocumentIncludeFolder[];
};

export const TrashBoxContent = ({ folders, documents }: Props) => {
  const { items, onChangeHandler } = useTrashBox({ folders, documents });
  return (
    <section aria-label="削除一覧" className="grid gap-3">
      <Input className="text-sm" onChange={onChangeHandler} placeholder="ゴミ箱の中を検索" />
      {items.length > 0 ? <ArchiveList items={items} /> : <p className="py-20 text-center text-muted-foreground">No Folders</p>}
    </section>
  );
};
