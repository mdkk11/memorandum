import { useCallback, useEffect, useState } from 'react';
import { useSensors, useSensor, KeyboardSensor, type DragStartEvent, type DragEndEvent, MouseSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Document } from '@prisma/client';
import { toast } from 'sonner';
import { assertIsExist } from '@/libs/utils';
import { FolderIncludeDocuments } from '@/services/folders';
import { updateDocumentsIndex, updateFoldersIndex } from './action';

type UpdatedItem = FolderIncludeDocuments | Document;

export const useList = (listItems: FolderIncludeDocuments[]) => {
  const [items, setItems] = useState(listItems);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<UpdatedItem>();
  const containers = items.map((item) => item.id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(listItems);
  }, [listItems]);

  const sortItems = async (updatedItem: UpdatedItem, items: FolderIncludeDocuments[]) => {
    try {
      if ('folderId' in updatedItem) {
        const folder = items.find((item) => item.id === updatedItem.folderId);
        assertIsExist(folder);
        await updateDocumentsIndex(folder.documents, folder.id);
        toast.success(`${updatedItem.title}の移動が完了しました`);
      } else {
        await updateFoldersIndex(items, updatedItem.id);
        toast.success(`${updatedItem.title}の移動が完了しました`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((v) => v !== id);
      } else {
        return [...new Set([...prev, id])];
      }
    });
  }, []);

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const id = active.id.toString();
      const activeItem = findDocumentById(items, id);
      if (activeItem && activeItem.id === id) {
        setActiveItem(activeItem);
      } else {
        const child = activeItem?.documents.find((v) => v.id === id);
        child && setActiveItem(child);
      }
    },
    [items]
  );

  const handleDragOver = useCallback(() => {}, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setIsLoading(true);
      try {
        const { active, over } = event;
        if (!over) {
          return null;
        }

        const activeId = String(active.id);
        const overId = over ? String(over.id) : null;
        const activeItem = findDocumentById(items, activeId);
        const overItem = findDocumentById(items, overId);

        const isParentItem = !!items.find((i) => i.id === activeId && 'documents' in i);
        if (isParentItem) {
          if (activeItem?.index === overItem?.index) {
            return;
          }

          const activeIndex = items.findIndex((i) => active.id === i.id);
          const overIndex = items.findIndex((i) => overId === i.id);
          const newItems = arrayMove(items, activeIndex, overIndex);
          setItems(newItems);
          await sortItems(items[activeIndex], newItems);
          return;
        }

        if (!activeItem || !overItem || activeItem !== overItem) {
          return null;
        }

        const activeIndex = activeItem.documents.findIndex((i) => i.id === activeId);
        const overIndex = overItem.documents.findIndex((i) => i.id === overId);

        if (activeIndex !== overIndex) {
          const newItems = items.map((item) => {
            if (item.id === activeItem.id) {
              item.documents = arrayMove(overItem.documents, activeIndex, overIndex);
              return item;
            } else {
              return item;
            }
          });
          setItems(newItems);
          await sortItems(overItem.documents[overIndex], newItems);
        }
      } catch (error) {
        console.log(error);
        toast.error('エラーが発生しました。');
      } finally {
        setIsLoading(false);
      }
    },
    [items]
  );

  function findDocumentById(items: FolderIncludeDocuments[], uniqueId: string | null) {
    if (!uniqueId) {
      return null;
    }
    if (items.some((item) => item.id === uniqueId)) {
      return items.find((item) => item.id === uniqueId) ?? null;
    }
    const id = String(uniqueId);
    const itemWithDocumentId = items.flatMap((item) => {
      const documentId = item.id;
      return item.documents.map((i) => ({
        itemId: i.id,
        documentId: documentId,
      }));
    });
    const containerId = itemWithDocumentId.find((i) => i.itemId === id)?.documentId;
    return items.find((item) => item.id === containerId) ?? null;
  }

  return {
    items,
    activeItem,
    expandedIds,
    containers,
    sensors,
    isLoading,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    onExpand,
  };
};
