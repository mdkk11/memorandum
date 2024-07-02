import React, { ComponentPropsWithoutRef } from 'react';
import { Button as ReactEmailButton } from '@react-email/components';
import { cn } from '@/libs/utils';

type Props = ComponentPropsWithoutRef<typeof ReactEmailButton>;

export const Button = ({ className, ...props }: Props) => {
  return (
    <ReactEmailButton className={cn('rounded-md bg-[#2563EB] px-5 py-3 text-center text-[12px] font-semibold text-white', className)} {...props}>
      メールアドレスを確認
    </ReactEmailButton>
  );
};
