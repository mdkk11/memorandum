import React from 'react';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/libs/utils';
import { buttonVariants } from '../Button';

type Props = ComponentPropsWithoutRef<typeof Link> & VariantProps<typeof buttonVariants>;

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(function LinkButtonBase({ size, variant, className, ...props }, ref) {
  return <Link className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
