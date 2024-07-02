import { searchParams } from '@/app/types';
import { authGuard } from '@/services/authGuard';
import { getAllFoldersWithPagination } from '@/services/folders/getAllFoldersPagination';
import { Pagination } from '@/ui/Pagination';
import { Section } from '@/ui/Section';
import { FolderList } from './_components/FolderList';
import { OrderByHeader } from './_components/OrderByHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ドキュメント一覧',
};

type Props = {
  searchParams: searchParams;
};
export default async function DocumentPage({ searchParams }: Props) {
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const orderBy = typeof searchParams.orderBy === 'string' ? searchParams.orderBy : 'index';
  const { id } = await authGuard();
  const { folders, pagination } = await getAllFoldersWithPagination({ page, take: '9', orderBy, authorId: id });
  const isFolders = folders.length > 0;

  return (
    <Section className="mx-auto w-full">
      <div className="container mx-auto flex min-h-[600px] flex-col justify-between gap-10 pt-20">
        <div className="flex flex-col gap-8">
          {isFolders && <OrderByHeader className="ml-auto w-24" />}
          {isFolders ? <FolderList folders={folders} /> : <p className="pt-20 text-center text-muted-foreground">No Folders</p>}
        </div>
        <Pagination currentPage={+page} pagination={pagination} pathname="/documents" />
      </div>
    </Section>
  );
}
