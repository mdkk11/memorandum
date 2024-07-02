'use client';

import React from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaginationProps } from '@/libs/pagination';
import { PaginationEllipsis, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious, Pagination as Provider } from './components';

function isCurrent(a: number, b: number): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    'aria-current': (a == 0 && b == 1) || a == b ? 'page' : undefined,
  };
}

type Props = { currentPage: number; pathname: string; pagination: PaginationProps; prefetch?: boolean; separator?: string };

export const Pagination = ({ currentPage, pathname, pagination, prefetch }: Props) => {
  const searchParams = useSearchParams();
  if (!pagination) return null;

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };
  const createPath = (query: string) => pathname + '?' + createQueryString('page', query);
  return (
    <Provider>
      <PaginationList>
        {pagination.prev && (
          <PaginationItem>
            <PaginationPrevious href={createPath(pagination.prev)} prefetch={prefetch} />
          </PaginationItem>
        )}
        {pagination?.items.map((item, index) => (
          <PaginationItem key={index}>
            {typeof item === 'number' ? (
              <PaginationLink href={createPath(String(item))} prefetch={prefetch} {...isCurrent(currentPage, item)}>
                {item.toString()}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        {pagination.next && (
          <PaginationItem>
            <PaginationNext href={createPath(pagination.next)} prefetch={prefetch} />
          </PaginationItem>
        )}
      </PaginationList>
    </Provider>
  );
};

export type { PaginationProps };
