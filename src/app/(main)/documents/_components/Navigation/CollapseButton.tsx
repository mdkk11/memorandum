import React, { ComponentProps } from 'react';
import { IconButton } from '@/app/(main)/documents/_components/IconButton';
import { cn } from '@/libs/utils';
import { Icon } from '@/ui/Icons';

type Props = {
  isMobile: boolean;
} & Pick<ComponentProps<'button'>, 'onClick'>;

/**
 * @package
 */
export const CollapseButton = ({ isMobile, ...props }: Props) => {
  return (
    <IconButton className={cn('absolute z-10 right-1 top-2 size-6', isMobile && 'opacity-100')} {...props}>
      <Icon aria-label="resize-icon" type="arrowLeft" />
    </IconButton>
  );
};
