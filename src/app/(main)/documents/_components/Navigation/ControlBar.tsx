import React, { ComponentProps } from 'react';

type Props = Pick<ComponentProps<'div'>, 'onMouseDown' | 'onClick'>;

/**
 * @package
 */
export const ControlBar = ({ ...props }: Props) => {
  return <div className="absolute -right-0.5 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100" role="button" {...props} />;
};
