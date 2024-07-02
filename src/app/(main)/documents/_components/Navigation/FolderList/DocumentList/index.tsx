'use client';

import React from 'react';
import { useSortable, SortableContext } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { Item } from '@/app/(main)/documents/_components/Item';
import { cn } from '@/libs/utils';
import { FolderIncludeDocuments } from '@/services/folders';
import { Label } from './Label';
import { ListItem } from './ListItem';

type Props = {
  id: string;
  item: FolderIncludeDocuments;
  listLength: number;
  expandedIds: string[];
  pathName: string;
  isLoading: boolean;
  onExpand: (id: string) => void;
};

export const DocumentList = ({ id, item, expandedIds, listLength, pathName, isLoading, onExpand }: Props) => {
  const isExpanded = expandedIds.includes(id);

  const { listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id,
  });

  return (
    <div className={cn(isDragging && 'opacity-0')}>
      <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...listeners}>
        <Label id={id} isCurrent={pathName.includes(`/documents/${id}`)} isExpanded={isExpanded && !isOver} label={item.title} length={listLength} onExpand={() => onExpand(id)} />
        {!isDragging && !isOver && isExpanded && (
          <SortableContext disabled={isLoading} items={item.documents}>
            {item.documents.length > 0 ? (
              item.documents.map((item) => (
                <Link href={`/documents/${item.folderId}/${item.id}`} key={item.id}>
                  <ListItem id={item.id} isCurrent={`/documents/${item.folderId}/${item.id}` === pathName} title={item.title} />
                </Link>
              ))
            ) : (
              <Item className="pl-10 hover:bg-inherit">No Documents</Item>
            )}
          </SortableContext>
        )}
      </div>
    </div>
  );
};
