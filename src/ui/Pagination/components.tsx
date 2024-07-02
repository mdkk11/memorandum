import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/libs/utils';
import { Icon } from '@/ui/Icons';
import { ButtonProps, buttonVariants } from '../Button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => <nav aria-label="ページネーション" className={cn('mx-auto flex w-full justify-center', className)} role="navigation" {...props} />;
Pagination.displayName = 'Pagination';

const PaginationList = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />);
PaginationList.displayName = 'PaginationList';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => <li className={cn('', className)} ref={ref} {...props} />);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = Pick<ButtonProps, 'size'> & React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, ...props }: PaginationLinkProps) => <Link className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'aria-[current=page]:border', className)} {...props} />;
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="前のページへ" className={cn('', className)} size="md" {...props}>
    <Icon size={'sm'} type="arrowLeft" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="次のページへ" className={cn('', className)} size="md" {...props}>
    <Icon size={'sm'} type="arrowRight" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex size-9 items-center justify-center', className)} {...props}>
    <Icon size={'sm'} type="moreHorizontal" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export { Pagination, PaginationList, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
