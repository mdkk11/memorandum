'use client';

import React from 'react';
import Dropdown from '@/ui/Dropdown';
import { Icon } from '@/ui/Icons';
import { AddDocument } from './AddDocument';
import { UpdateFolder } from './UpdateFolder';

type Props = {
  id: string;
  length: number;
};

export const Menu = ({ id, length }: Props) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Icon aria-label="Show Folder Menu" className="mt-1" type="moreHorizontal" />
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.ContentGroup>
          <Dropdown.ContentItem>
            <AddDocument id={id} index={length + 1} />
          </Dropdown.ContentItem>
          <Dropdown.ContentItem>
            <UpdateFolder hasDocuments={!!(length > 0)} id={id} />
          </Dropdown.ContentItem>
        </Dropdown.ContentGroup>
      </Dropdown.Content>
    </Dropdown>
  );
};
