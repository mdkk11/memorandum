import React, { ComponentPropsWithoutRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs/utils';
import { Icons } from './assets';

type IconsType = keyof typeof Icons;

export type Props = {
  type: IconsType;
  className?: string;
} & VariantProps<typeof iconVariants> &
  ComponentPropsWithoutRef<'svg'>;

const iconVariants = cva('block', {
  variants: {
    size: {
      xs: 'scale-50',
      sm: 'scale-75',
      md: 'scale-100',
      lg: 'scale-125',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
export function Icon({ className, type, size, ...props }: Props) {
  const SVGIcon = Icons[type];

  return <SVGIcon className={cn(iconVariants({ size }), className)} {...props} />;
}
