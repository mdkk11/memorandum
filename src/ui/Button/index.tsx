import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs/utils';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>;

export const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-secondary-foreground underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-9 px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonBase({ className, variant, size, ...props }, ref) {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
