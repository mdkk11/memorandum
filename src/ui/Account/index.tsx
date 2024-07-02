import React, { ComponentProps } from 'react';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';

type Props = {
  name: string;
  textProps?: ComponentProps<typeof Typography>;
} & Pick<ComponentProps<typeof Avatar>, 'avatarImageUrl' | 'size'>;

export function Account({ name, avatarImageUrl, size = 'sm', textProps }: Props) {
  return (
    <div aria-labelledby={name} className="flex items-center gap-2">
      <Avatar avatarImageUrl={avatarImageUrl} size={size} />
      {name && (
        <Typography {...textProps} size={size}>
          {name}
        </Typography>
      )}
    </div>
  );
}
