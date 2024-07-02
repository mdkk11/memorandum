import { notFound } from 'next/navigation';
import { searchParams } from '@/app/types';
import { getSession } from '@/libs/auth';
import { getFolderById } from '@/services/folders/getFolderById';
import { Pagination } from '@/ui/Pagination';
import { Section } from '@/ui/Section';
import { Separator } from '@/ui/Separator';
import { OrderByHeader } from '../_components/OrderByHeader';
import { DocumentList } from './_components/DocumentList';
import { Header } from './_components/Header';
import { Notion } from './_components/Notion';
import { TitleForm } from './_components/TitleForm';
import type { Metadata } from 'next';

type Props = {
  searchParams: searchParams;
  params: { folderId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getSession();
  const folderId = params.folderId;
  if (!session) notFound();
  const { folder } = await getFolderById({ authorId: session.user.id, folderId });
  if (!folder) notFound();
  return { title: `${folder.title}` };
}

export default async function FolderPage({ params, searchParams }: Props) {
  const session = await getSession();
  const folderId = params.folderId;
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const orderBy = typeof searchParams.orderBy === 'string' ? searchParams.orderBy : 'index';
  if (!session) notFound();
  const { folder, pagination } = await getFolderById({ page, take: '9', orderBy, authorId: session.user.id, folderId });
  if (!folder) notFound();

  const breadcrumb = [{ title: folder.title, href: `/documents/${folderId}`, isFolder: true }];
  const hasDocuments = folder.documents.length > 0;

  return (
    <Section className="w-full p-0">
      <Header breadcrumb={breadcrumb} length={folder.documents.length} {...folder} />
      {folder.isArchive && <Notion id={folder.id} />}
      <div className="container mx-auto flex flex-col justify-between gap-10 p-4">
        <div className="flex min-h-[600px] flex-col gap-8 pt-10">
          <TitleForm id={folder.id} title={folder.title} />
          <Separator />
          <div className="flex flex-col gap-8">
            {hasDocuments && <OrderByHeader className="ml-auto" />}
            {hasDocuments ? <DocumentList documents={folder.documents} /> : <p className="mt-20 text-center text-muted-foreground">No Documents</p>}
          </div>
        </div>
        <Pagination currentPage={+page} pagination={pagination} pathname={`/documents/${folderId}`} />
      </div>
    </Section>
  );
}
