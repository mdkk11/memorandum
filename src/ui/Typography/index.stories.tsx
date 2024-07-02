import { Typography } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Typography,
  args: { children: '文字'.repeat(3) },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bold: Story = {
  args: { bold: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const XLarge: Story = {
  args: { size: 'xl' },
};

export const XXLarge: Story = {
  args: { size: 'xxl' },
};
