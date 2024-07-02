import { ComponentPropsWithRef, createElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

type Tag = 'p' | 'span' | 'li';

type Props<T extends Tag> = VariantProps<typeof typographyVariants> & ComponentPropsWithRef<T> & { tag?: T; bold?: boolean };

const typographyVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Typography<T extends Tag>({ tag, size, bold = false, className, children, ...props }: Props<T>) {
  return createElement(
    tag ?? 'p',
    {
      className: cn(typographyVariants({ size }), bold && 'font-bold', className),
      ...props,
    },
    children
  );
}
