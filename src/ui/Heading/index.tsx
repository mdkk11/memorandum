import { ComponentPropsWithRef, createElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type Props<T extends Level> = VariantProps<typeof headingVariants> & ComponentPropsWithRef<T> & { level: T; bold?: boolean };

const headingVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'text-2xl',
      xxxl: 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Heading<T extends Level>({ level, size, bold = false, className, children, ...props }: Props<T>) {
  return createElement(
    level,
    {
      className: cn(headingVariants({ size }), bold && 'font-bold', className),
      ...props,
    },
    children
  );
}
