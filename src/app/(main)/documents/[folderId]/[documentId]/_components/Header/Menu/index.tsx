'use client';

import React from 'react';
import { Document } from '@/types/document';
import Dropdown from '@/ui/Dropdown';
import { Icon } from '@/ui/Icons';
import { UpdateDocument } from './UpdateDocument';

type Props = Pick<Document, 'id' | 'folderId'>;

export const Menu = ({ id, folderId }: Props) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Icon aria-label="Show Document Menu" className="mt-1" type="moreHorizontal" />
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.ContentGroup>
          <Dropdown.ContentItem asChild>
            <UpdateDocument folderId={folderId} id={id} />
          </Dropdown.ContentItem>
        </Dropdown.ContentGroup>
      </Dropdown.Content>
    </Dropdown>
  );
};
