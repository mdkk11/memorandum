import { ChangeEvent, useCallback, useMemo, useState } from 'react';
// import { debounce } from '@/app/_libs/debounce';
import { useDebounce } from '@/app/_hooks/useDebounce';
import { DocumentIncludeFolder } from '@/services/documents';
import { FolderIncludeDocuments } from '@/services/folders';

export type ArchiveListItem = {
  id: string;
  title: string;
  folderTitle?: string;
  folderId?: string;
  index?: number;
};

export const useTrashBox = ({ folders, documents }: { folders: FolderIncludeDocuments[]; documents: DocumentIncludeFolder[] }) => {
  const [searchWord, setSearchWord] = useState('');
  const { debounce } = useDebounce(300);
  const folderData = folders.map(({ id, title }) => ({ id, title }));
  const documentData = documents.map(({ id, folder, title }) => ({
    id,
    title,
    folderTitle: folder.title,
    folderId: folder.id,
  }));

  const initialItems = useMemo(() => [...folderData, ...documentData], [folderData, documentData]);
  const filteredItems = useMemo(() => initialItems.filter((item) => item.title.toLowerCase().includes(searchWord)), [initialItems, searchWord]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const word = e.target.value;
      debounce(() => {
        if (word === '') {
          setSearchWord('');
          return;
        }
        setSearchWord(word.toLowerCase());
      });
    },
    [setSearchWord, debounce]
  );
  const items = searchWord === '' ? initialItems : filteredItems;

  return { items, onChangeHandler };
};
