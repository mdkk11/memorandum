'use client';

import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { Icon } from '@/ui/Icons';
import { ActionButtons } from './ActionButtons';
import { ArchiveListItem } from './useTrashBox';

type Props = {
  items: ArchiveListItem[];
};

export const ArchiveList = ({ items }: Props) => {
  return (
    <ul className="max-h-[320px] min-h-[320px]  w-full overflow-y-scroll">
      {items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

function ListItem({ item }: { item: ArchiveListItem }) {
  const isDocument = !!item.folderTitle;
  return (
    <li className="flex w-full items-center gap-2 p-1 text-muted-foreground hover:bg-primary/5">
      <Icon className="shrink-0" size={'sm'} type={isDocument ? 'file' : 'folder'} />
      <Link className="grid w-full gap-1" href={isDocument ? `/documents/${item.folderId}/${item.id}` : `/documents/${item.id}`}>
        {isDocument ? (
          <>
            <ListItemTitle>{item.title}</ListItemTitle>
            <ListItemTitle className="text-xs opacity-70">{item.folderTitle}</ListItemTitle>
          </>
        ) : (
          <ListItemTitle>{item.title}</ListItemTitle>
        )}
      </Link>
      <ActionButtons folderId={item.folderId} id={item.id} isDocument={isDocument} />
    </li>
  );
}

function ListItemTitle({ children }: ComponentPropsWithoutRef<'div'>) {
  return <div className="truncate text-sm text-muted-foreground">{children}</div>;
}
