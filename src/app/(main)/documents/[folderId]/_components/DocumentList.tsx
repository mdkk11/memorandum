import React from 'react';
import { Document } from '@prisma/client';
import Link from 'next/link';
import { CardList } from '@/app/_components/CardList';
import { RelativeTimestamp } from '@/app/_components/RelativeTimestamp';
import { Heading } from '@/ui/Heading';
import { Icon } from '@/ui/Icons';

type Props = {
  documents: Document[];
};

export const DocumentList = ({ documents }: Props) => {
  return (
    <CardList>
      <CardList.Container>
        {documents.map((document) => {
          return (
            <li key={document.id}>
              <Link aria-label={document.title} href={`/documents/${document.folderId}/${document.id}`}>
                <DocumentList.Item document={document} />
              </Link>
            </li>
          );
        })}
      </CardList.Container>
    </CardList>
  );
};

DocumentList.Item = function DocumentListItem({ document }: { document: Document }) {
  return (
    <CardList.ItemContainer>
      <CardList.ItemHeader className="flex items-center gap-3">
        <Icon className="shrink-0 stroke-gray-600" type="file" />
        <Heading className="overflow-hidden text-ellipsis font-semibold" level="h3">
          {document.title}
        </Heading>
      </CardList.ItemHeader>
      <CardList.ItemFooter>
        <RelativeTimestamp className="text-right text-sm text-muted-foreground" date={document.updatedAt} />
      </CardList.ItemFooter>
    </CardList.ItemContainer>
  );
};
