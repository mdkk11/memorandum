import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs/utils';

type Props = {
  avatarImageUrl?: string | null;
  className?: string;
} & VariantProps<typeof avatarVariants>;

const avatarVariants = cva('inline-block rounded-full bg-white bg-cover bg-center leading-none', {
  variants: {
    size: {
      sm: 'max-h-8 min-h-8 min-w-8 max-w-8',
      md: 'max-h-12 min-h-12 min-w-12 max-w-12',
      lg: 'max-h-16 min-h-16 min-w-16 max-w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Avatar = ({ size, className, avatarImageUrl }: Props) => {
  const avatarImage = avatarImageUrl ?? '/assets/account.svg';

  return <span className={cn(avatarVariants({ size }), className)} role="img" style={{ backgroundImage: `url(${avatarImage})` }} />;
};
