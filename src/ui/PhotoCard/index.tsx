import React, { ComponentProps } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

const ImageSizes = {
  sm: { width: 180, height: 120 },
  md: { width: 420, height: 280 },
  lg: { width: 960, height: 640 },
} as const;

type Props = {
  size?: keyof typeof ImageSizes;
} & VariantProps<typeof photoCardVariants> &
  Omit<ComponentProps<typeof Image>, 'size'>;

const photoCardVariants = cva('size-full object-center', {
  variants: {
    fit: {
      cover: 'object-cover',
      contain: 'object-contain',
    },
    ratio: {
      wide: 'aspect-[3/2]',
      square: 'aspect-square',
      portrait: 'aspect-[2/3]',
    },
  },
  defaultVariants: {
    fit: 'cover',
    ratio: 'wide',
  },
});

export function PhotoCard({ ratio, fit, src, alt, size = 'md', priority, ...photo }: Props) {
  return (
    <div className="relative overflow-hidden rounded-md shadow-md">
      <Image
        alt={alt || ''}
        className={photoCardVariants({ ratio, fit })}
        src={src}
        {...ImageSizes[size]}
        priority={priority}
        {...photo}
      />
    </div>
  );
}
