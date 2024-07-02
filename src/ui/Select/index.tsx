import React from 'react';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/libs/utils';
import { Icon } from '@/ui/Icons';

type Props = ComponentPropsWithoutRef<'select'>;

export const Select = forwardRef<HTMLSelectElement, Props>(function SelectBase({ className, children, ...props }, ref) {
  return (
    <span className="relative block w-full">
      <select
        className={cn('flex h-10 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <Icon className="h-2 w-3.5" type="arrowDown" />
      </div>
    </span>
  );
});
