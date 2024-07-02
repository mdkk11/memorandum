import React, { ComponentProps } from 'react';
import { cn } from '@/libs/utils';
import { Typography } from '../Typography';

type Props = ComponentProps<typeof Typography>;

export function AlertText({ children, className }: Props) {
  return <Typography className={cn('text-destructive', className)}>{children}</Typography>;
}
