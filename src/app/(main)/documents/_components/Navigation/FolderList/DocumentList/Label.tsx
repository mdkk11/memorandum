'use client';

import Link from 'next/link';
import { Item } from '@/app/(main)/documents/_components/Item';
import { cn, isCurrentLink } from '@/libs/utils';
import { Icon } from '@/ui/Icons';
import { AddDocumentButton } from './AddDocumentButton';
import { ExpandButton } from './ExpandButton';

type Props = {
  id: string;
  label: string;

  isExpanded: boolean;
  length: number;
  isCurrent: boolean;
  onExpand: () => void;
};

/**
 * @package
 */
export const Label = ({ id, label, isExpanded, length, isCurrent, onExpand }: Props) => {
  return (
    <Item className={(cn(isCurrent && 'bg-primary/5'), 'pr-0.5')} isActive={isCurrent}>
      {onExpand ? <ExpandButton expanded={isExpanded} onClick={onExpand} /> : <div className="w-4" />}
      <Link className="flex h-8 w-full items-center gap-1.5 truncate aria-[current=page]:font-bold" href={`/documents/${id}`} {...isCurrentLink(isCurrent)}>
        <Icon className="shrink-0 scale-75" type="folder" />
        <span className="truncate">{label}</span>
      </Link>
      <AddDocumentButton id={id} length={length} />
    </Item>
  );
};
