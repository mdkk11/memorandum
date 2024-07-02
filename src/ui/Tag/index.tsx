import React from 'react';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithRef<'span'> & VariantProps<typeof tagVariants>;

const tagVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'px-2 py-1 text-xs ',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-1.5 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const Tag = forwardRef<HTMLSpanElement, Props>(function TagBase({ className, variant, size, ...props }, ref) {
  return <span {...props} className={cn(tagVariants({ variant, size }), className)} ref={ref} />;
});
