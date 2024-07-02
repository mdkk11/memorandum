import { ComponentPropsWithoutRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs/utils';
import { Icon } from '@/ui/Icons';

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  variants: {
    size: {
      default: 'scale-100',
      sm: 'scale-75',
      lg: 'scale-125',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type Props = VariantProps<typeof spinnerVariants> & Omit<ComponentPropsWithoutRef<'svg'>, 'type'>;

export const Spinner = ({ size, className, ...props }: Props) => {
  return <Icon className={cn(spinnerVariants({ size }), className)} type="loader" {...props} />;
};
