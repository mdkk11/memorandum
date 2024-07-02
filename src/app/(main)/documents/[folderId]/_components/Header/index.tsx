'use client';

import { ComponentProps } from 'react';
import { Folder } from '@prisma/client';
import { Breadcrumb } from '@/app/(main)/documents/_components/BreadCrumb';
import { RelativeTimestamp } from '@/app/_components/RelativeTimestamp';
import { Menu } from './Menu';

type Props = Folder & { length: number } & ComponentProps<typeof Breadcrumb>;

export const Header = ({ id, isArchive, length, updatedAt, breadcrumb }: Props) => {
  return (
    <div className="flex items-center justify-between px-2">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="flex gap-4">
        <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
          <RelativeTimestamp date={updatedAt} />
          <span>更新</span>
        </div>
        {!isArchive && <Menu id={id} length={length} />}
      </div>
    </div>
  );
};
