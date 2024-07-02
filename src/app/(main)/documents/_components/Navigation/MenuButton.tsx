import React from 'react';
import { Icon } from '@/ui/Icons';

type Props = Pick<React.ComponentProps<'button'>, 'onClick'>;

/**
 * @package
 */
export const MenuButton = ({ ...props }: Props) => {
  return (
    <button className="size-6 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" {...props}>
      <Icon size={'sm'} type="menu" />
    </button>
  );
};
