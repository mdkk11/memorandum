import React, { ComponentPropsWithoutRef } from 'react';
import { Link as ReactEmailLink } from '@react-email/components';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<typeof ReactEmailLink>;

export const Link = ({ className, ...props }: Props) => {
  return <ReactEmailLink className={cn('text-sm text-blue-600 no-underline', className)} {...props} />;
};
