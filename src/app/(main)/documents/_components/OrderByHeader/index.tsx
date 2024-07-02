import { ComponentProps } from 'react';
import { OrderBy } from '@/app/_components/OrderBy';

export const OrderByHeader = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <OrderBy />
    </div>
  );
};
