import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/libs/utils';

type Props = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  length: number;
  limit: number;
};

export const MaxLengthText = ({ length, limit, className, ...props }: Props) => {
  return (
    <span className={cn('text-xs flex gap-0.5 text-muted-foreground', className)} {...props}>
      <span className={cn(length > limit && 'text-destructive')}>{length}</span>
      <span>/</span>
      <span>{limit}</span>
    </span>
  );
};
