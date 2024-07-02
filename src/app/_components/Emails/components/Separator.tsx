import React, { ComponentPropsWithoutRef } from 'react';
import { Hr } from '@react-email/components';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<typeof Hr>;
export const Separator = ({ className, ...props }: Props) => {
  return <Hr className={cn('w-full my-4 border border-solid border-[#eaeaea]', className)} {...props} />;
};
