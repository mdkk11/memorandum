import Link from 'next/link';
import { CardList } from '@/app/_components/CardList';
import { RelativeTimestamp } from '@/app/_components/RelativeTimestamp';
import { FoldersWithDocumentsCount } from '@/services/folders';
import { Heading } from '@/ui/Heading';
import { Icon } from '@/ui/Icons';

export const FolderList = ({ folders }: { folders: FoldersWithDocumentsCount[] }) => {
  return (
    <CardList>
      <CardList.Container>
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link aria-label={folder.title} href={`/documents/${folder.id}`}>
              <FolderList.Item folder={folder} />
            </Link>
          </li>
        ))}
      </CardList.Container>
    </CardList>
  );
};

FolderList.Item = function FolderListItem({ folder }: { folder: FoldersWithDocumentsCount }) {
  return (
    <CardList.ItemContainer>
      <CardList.ItemHeader className="flex items-center gap-3 truncate">
        <Icon className=" shrink-0" type="folder" />
        <Heading className="overflow-hidden text-ellipsis font-semibold" level="h3">
          {folder.title}
        </Heading>
      </CardList.ItemHeader>
      <CardList.ItemFooter>
        <RelativeTimestamp className="text-sm" date={folder.updatedAt} />
      </CardList.ItemFooter>
      <FolderList.Count count={folder._count.documents} />
    </CardList.ItemContainer>
  );
};

FolderList.Count = function FolderListCount({ count }: { count: number }) {
  if (count === 0) {
    return;
  }
  return <div className="absolute -right-3 -top-3 grid size-6 place-content-center rounded-full bg-slate-500 text-sm font-semibold text-white">{count}</div>;
};
