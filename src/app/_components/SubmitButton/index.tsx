'use client';

import { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/libs/utils';
import { ButtonProps, buttonVariants } from '@/ui/Button';
import { Icon } from '@/ui/Icons';
import { Spinner } from '@/ui/Spinner';

type Props = {
  iconProps?: ComponentProps<typeof Icon>;
  isLoading?: boolean;
} & ButtonProps;

export const SubmitButton = ({ className, children, iconProps, isLoading, variant, size }: Props) => {
  const { pending } = useFormStatus();

  const loading = pending || isLoading;

  return (
    <button className={cn('flex w-full items-center gap-2', loading && ' disabled:opacity-70', (variant || size) && buttonVariants({ variant, size }), className)} disabled={loading} type="submit">
      {iconProps && (loading ? <Spinner /> : <Icon {...iconProps} />)}
      {children}
    </button>
  );
};
