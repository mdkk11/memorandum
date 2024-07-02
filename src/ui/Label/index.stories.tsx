import { Input } from '../Input';
import { Label } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Label,
  args: { children: 'ラベル' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  args: {
    className: 'whitespace-nowrap',
    children: 'コメント',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story />：
        <Input />
      </div>
    ),
  ],
};
