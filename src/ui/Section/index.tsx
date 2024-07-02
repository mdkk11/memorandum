import React from 'react';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<'section'>;

export const Section = forwardRef<HTMLSelectElement, Props>(function SectionBase({ className, ...props }, ref) {
  return <section {...props} className={cn('p-4', className)} ref={ref} />;
});
