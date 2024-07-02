import React, { ComponentPropsWithoutRef } from 'react';
import { Icon } from '@/ui/Icons';
import { IconButton } from '../../../IconButton';

type Props = ComponentPropsWithoutRef<typeof IconButton> & { expanded?: boolean };

/**
 * @package
 */
export const ExpandButton = ({ expanded, ...props }: Props) => {
  return (
    <IconButton {...props}>
      <Icon aria-label="Show Documents" className="scale-[0.8]" type={expanded ? 'arrowDown' : 'arrowRight'} />
    </IconButton>
  );
};
