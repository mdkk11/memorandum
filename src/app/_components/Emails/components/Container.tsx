import React, { ComponentPropsWithoutRef } from 'react';
import { Container as ReactEmailContainer } from '@react-email/components';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<typeof ReactEmailContainer>;

export const Container = ({ className, ...props }: Props) => {
  return <ReactEmailContainer className={cn('className="mx-auto my-8 max-w-[465px] rounded border border-solid border-[#eaeaea] p-4', className)} {...props} />;
};
