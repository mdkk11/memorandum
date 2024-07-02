'use client';

import React from 'react';
import { Folder } from '@prisma/client';
import { DeleteButton } from './DeleteButton';
import { RestoreButton } from './RestoreButton';

type Props = Pick<Folder, 'id'>;

export const ActionButtons = ({ id }: Props) => {
  return (
    <div className="flex gap-2">
      <RestoreButton id={id} />
      <DeleteButton id={id} />
    </div>
  );
};
