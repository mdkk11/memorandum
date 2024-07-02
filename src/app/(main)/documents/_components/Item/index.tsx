import React, { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/libs/utils';

type Props = { children: React.ReactNode; asChild?: boolean; isActive?: boolean } & Pick<ComponentProps<'div'>, 'className'>;

/**
 * @package
 */
export const Item = ({ children, className, asChild, isActive }: Props) => {
  const Component = asChild ? Slot : 'div';
  return <Component className={cn('flex min-h-8 w-full items-center text-sm font-medium text-muted-foreground hover:bg-primary/5', isActive && 'bg-primary/5', className)}>{children}</Component>;
};
