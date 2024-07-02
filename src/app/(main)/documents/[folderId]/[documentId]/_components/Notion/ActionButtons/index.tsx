'use client';

import React from 'react';
import { Document } from '@prisma/client';
import { DeleteButton } from './DeleteButton';
import { RestoreButton } from './RestoreButton';

type Props = Document;

export const ActionButtons = ({ ...props }: Props) => {
  return (
    <div className="flex gap-2">
      <RestoreButton {...props} />
      <DeleteButton {...props} />
    </div>
  );
};
