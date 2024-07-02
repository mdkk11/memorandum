import React, { ComponentProps } from 'react';
import { SubmitButton } from '@/app/_components/SubmitButton';
import { cn } from '@/libs/utils';
import { Button as UtilButton, buttonVariants } from '@/ui/Button';

type Props = ComponentProps<typeof UtilButton>;

/**
 * @package
 */
export const Button = ({ size, variant, className, ...props }: Props) => {
  return <SubmitButton className={cn(buttonVariants({ size, variant }), className)} {...props} />;
};
