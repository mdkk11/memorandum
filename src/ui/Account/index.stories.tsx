import { Account } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Account,
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoName: Story = {
  args: {
    name: '',
  },
};

export const WithName: Story = {
  args: {
    name: '佐藤 太郎',
  },
};
