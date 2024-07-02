'use client';

import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePathname } from 'next/navigation';
import { Item } from '@/app/(main)/documents/_components/Item';
import { cn } from '@/libs/utils';
import { FolderIncludeDocuments } from '@/services/folders';
import { Icon } from '@/ui/Icons';
import { DocumentList } from './DocumentList';
import { useList } from './useList';

type Props = {
  folders: FolderIncludeDocuments[];
};

/**
 * @package
 */
export const FolderList = ({ folders }: Props) => {
  const { items, activeItem, expandedIds, sensors, containers, isLoading, handleDragStart, handleDragOver, handleDragEnd, onExpand } = useList(folders);
  const pathName = usePathname();
  const isParent = activeItem ? 'documents' in activeItem : false;

  return (
    <div className="mx-auto flex w-full flex-col overflow-scroll">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart} sensors={sensors}>
        <SortableContext disabled={isLoading} items={containers} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <DocumentList expandedIds={expandedIds} id={item.id} isLoading={isLoading} item={item} key={item.id} listLength={item.documents.length} onExpand={onExpand} pathName={pathName} />
          ))}
          <DragOverlay>
            {activeItem ? (
              <Item className={cn('flex gap-1.5', isParent ? 'pl-4' : 'pl-3.5')}>
                <div className="w-4" />
                <Icon className="shrink-0 scale-75" type={isParent ? 'folder' : 'file'} />
                <span className="truncate">{activeItem.title}</span>
              </Item>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};
