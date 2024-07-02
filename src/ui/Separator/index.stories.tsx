import { Separator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: { text: 'or' },
};
