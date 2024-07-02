'use client';

import { ComponentProps, Fragment } from 'react';
import NextLink from 'next/link';
import { useNavigationCollapsed } from '@/app/(main)/documents/_components/Navigation/useNavigationCollapsed';
import { Icon } from '@/ui/Icons';

export type BreadcrumbType = {
  title: string;
  href: string;
  isFolder?: boolean;
};

type Props = {
  breadcrumb: BreadcrumbType[];
};

export const Breadcrumb = ({ breadcrumb }: Props) => {
  const { isCollapsed } = useNavigationCollapsed();

  return (
    <nav className={`flex list-none items-center gap-2  ${isCollapsed && 'pl-10'}`}>
      {breadcrumb.map(({ href, title, isFolder }) => (
        <Fragment key={href}>
          <Breadcrumb.ListItem>
            <Breadcrumb.Link href={href} isFolder={isFolder}>
              {title}
            </Breadcrumb.Link>
          </Breadcrumb.ListItem>
          <li className=" last-of-type:hidden">/</li>
        </Fragment>
      ))}
    </nav>
  );
};

Breadcrumb.ListItem = function Link({ ...props }: ComponentProps<'li'>) {
  return <li {...props} className="text-sm" />;
};

Breadcrumb.Link = function Link({ isFolder = false, children, ...props }: ComponentProps<typeof NextLink> & { isFolder?: boolean }) {
  return (
    <NextLink {...props} className="flex max-w-[300px] items-center gap-1.5 p-2 hover:text-opacity-50">
      <Icon className="shrink-0" size={'sm'} type={isFolder ? 'folder' : 'file'} />
      <span className="truncate">{children}</span>
    </NextLink>
  );
};
