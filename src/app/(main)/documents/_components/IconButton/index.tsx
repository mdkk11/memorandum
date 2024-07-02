import React, { ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<'button'> & { asChild?: boolean };

/**
 * @package
 */
export const IconButton = ({ className, asChild, ...props }: Props) => {
  const Component = asChild ? Slot : 'button';
  return <Component className={cn('grid place-items-center text-muted-foreground rounded-sm hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600', className)} {...props} />;
};
