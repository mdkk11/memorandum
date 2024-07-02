import { notFound } from 'next/navigation';
import { getSession } from '@/libs/auth';
import { getDocumentById } from '@/services/documents/getDocumentById';
import { Section } from '@/ui/Section';
import { DocumentForm } from './_components/DocumentForm';
import { Header } from './_components/Header';
import { Notion } from './_components/Notion';
import type { Metadata } from 'next';

type Props = { params: { documentId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getSession();
  if (!session) notFound();
  const { document } = await getDocumentById({ documentId: params.documentId, authorId: session.user.id });
  if (!document) notFound();
  return { title: `${document.title}` };
}

export default async function DocumentPage({ params }: Props) {
  const session = await getSession();
  if (!session) notFound();
  const { document } = await getDocumentById({ documentId: params.documentId, authorId: session.user.id });
  if (!document) notFound();

  const breadcrumb = [
    { title: document.folder.title, href: `/documents/${document.folderId}`, isFolder: true },
    {
      title: document.title,
      href: `/documents/${document.folderId}/${document.id}`,
    },
  ];

  return (
    <Section className="p-0">
      <Header breadcrumb={breadcrumb} {...document} />
      {document.isArchive && <Notion {...document} />}
      <div className="container mx-auto mt-10 flex flex-col justify-between gap-8 px-4">
        <DocumentForm {...document} />
      </div>
    </Section>
  );
}
