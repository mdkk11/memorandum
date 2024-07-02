import { Pagination } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    pathname: '/',
    pagination: {
      current: 2,
      prev: '1',
      next: '3',
      items: [1, 2, 3, 4, 5],
    },
  },
};
