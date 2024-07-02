import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

export type LabelProps = React.ComponentPropsWithoutRef<'label'> & VariantProps<typeof labelVariants>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function LabelBase({ className, ...props }, ref) {
  return <label className={cn(labelVariants(), className)} ref={ref} {...props} />;
});
