import React from 'react';
import Link from 'next/link';
import { Item } from '@/app/(main)/documents/_components/Item';
import { Icon } from '@/ui/Icons';

/**
 * @package
 */
export const AllFolderListLink = React.memo(function AllFolderListLink() {
  return (
    <Item asChild>
      <Link className="mx-1 flex w-full items-center gap-2 overflow-hidden" href={'/documents'}>
        <Icon size={'sm'} type="list" />
        All Folders
      </Link>
    </Item>
  );
});
